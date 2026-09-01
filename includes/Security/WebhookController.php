<?php
namespace NPATI\Hub\Security;

use NPATI\Hub\Core\Settings;
use NPATI\Hub\Database\AuditLog;
use NPATI\Hub\Content\ContentService;

defined( 'ABSPATH' ) || exit;

final class WebhookController {
	private $settings;
	private $audit;
	private $verifier;
	private $content;
	public function __construct( Settings $settings, AuditLog $audit, ContentService $content ) {
		$this->settings = $settings;
		$this->audit    = $audit;
		$this->content  = $content;
		$this->verifier = new SignatureVerifier(); }
	public function route() {
		register_rest_route(
			'npati/v1',
			'/webhook',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'handle' ),
				'permission_callback' => array( $this, 'verify_permission' ),
			)
		); }

	public function verify_permission( \WP_REST_Request $request ) {
		global $wpdb;
		$connections_table = $wpdb->prefix . 'npati_connections';
		$inbox_table       = $wpdb->prefix . 'npati_event_inbox';
		$timestamp         = (string) $request->get_header( 'x-npati-timestamp' );
		$request_id        = sanitize_text_field( (string) $request->get_header( 'x-npati-request-id' ) );
		$signature         = (string) $request->get_header( 'x-npati-signature' );
		$site_id           = sanitize_text_field( (string) $request->get_header( 'x-npati-site-id' ) );
		if ( ! $timestamp || ! $request_id || ! $signature || ! $site_id ) {
			return new \WP_Error( 'missing_signature_headers', __( 'Required NPATI signature headers are missing.', 'npati-content-automation' ), array( 'status' => 403 ) ); }
		if ( ! ctype_digit( $timestamp ) || abs( time() - (int) $timestamp ) > 300 ) {
			$this->audit->record( 'webhook', 'blocked', array(), $request_id, 'expired_timestamp' );
			return new \WP_Error( 'expired_timestamp', __( 'Webhook timestamp is outside the allowed window.', 'npati-content-automation' ), array( 'status' => 403 ) ); }
		$connection = $wpdb->get_row( $wpdb->prepare( 'SELECT site_id, hub_public_key FROM %i WHERE site_id = %s AND status = %s LIMIT 1', $connections_table, $site_id, 'connected' ), ARRAY_A );
		if ( ! $connection || empty( $connection['hub_public_key'] ) ) {
			return new \WP_Error( 'unknown_site', __( 'Unknown NPATI site connection.', 'npati-content-automation' ), array( 'status' => 403 ) ); }
		$canonical = $this->verifier->canonical( 'POST', '/wp-json/npati/v1/webhook', $timestamp, $request_id, $request->get_body() );
		$verified  = $this->verifier->verify( $signature, $connection['hub_public_key'], $canonical );
		if ( is_wp_error( $verified ) ) {
			return new \WP_Error( $verified->get_error_code(), $verified->get_error_message(), array( 'status' => 503 ) ); }
		if ( ! $verified ) {
			$this->audit->record( 'webhook', 'blocked', array(), $request_id, 'invalid_signature' );
			return new \WP_Error( 'invalid_signature', __( 'Invalid NPATI webhook signature.', 'npati-content-automation' ), array( 'status' => 403 ) ); }
		$existing = $wpdb->get_var( $wpdb->prepare( 'SELECT request_id FROM %i WHERE request_id = %s', $inbox_table, $request_id ) );
		if ( $existing ) {
			return new \WP_Error( 'replay_detected', __( 'This webhook request was already processed.', 'npati-content-automation' ), array( 'status' => 409 ) ); }
		$request->set_param( '_npati_request_id', $request_id );
		return true;
	}

	public function handle( \WP_REST_Request $request ) {
		global $wpdb;
		$inbox_table = $wpdb->prefix . 'npati_event_inbox';
		$request_id  = sanitize_text_field( (string) $request->get_param( '_npati_request_id' ) );
		$payload     = $request->get_json_params();
		if ( ! is_array( $payload ) ) {
			return new \WP_Error( 'invalid_json', __( 'Invalid webhook payload.', 'npati-content-automation' ), array( 'status' => 400 ) ); }
		$action  = sanitize_text_field( (string) ( $payload['action'] ?? '' ) );
		$allowed = array( 'wordpress.posts.list', 'wordpress.post.get', 'wordpress.post.delete', 'wordpress.taxonomies.list', 'wordpress.category.create', 'wordpress.category.delete', 'wordpress.tag.create', 'wordpress.tag.delete', 'wordpress.media.list', 'wordpress.media.upload', 'wordpress.media.delete', 'wordpress.post.create', 'wordpress.post.update', 'wordpress.post.publish', 'wordpress.content.generate', 'connection.healthcheck', 'connection.paused', 'security.warning', 'credential.rotated', 'automation.blocked' );
		if ( ! in_array( $action, $allowed, true ) ) {
			$this->audit->record( 'webhook', 'blocked', array( 'action' => $action ), $request_id, 'action_not_allowed' );
			return new \WP_Error( 'action_not_allowed', __( 'Webhook action is not allowed.', 'npati-content-automation' ), array( 'status' => 403 ) ); }
		$inserted = $wpdb->insert(
			$inbox_table,
			array(
				'request_id'   => $request_id,
				'received_at'  => current_time( 'mysql', true ),
				'status'       => 'processing',
				'payload_hash' => hash( 'sha256', $request->get_body() ),
			),
			array( '%s', '%s', '%s', '%s' )
		);
		if ( false === $inserted ) {
			return new \WP_Error( 'replay_detected', __( 'This webhook request was already processed.', 'npati-content-automation' ), array( 'status' => 409 ) ); }
		try {
			$result = 'connection.healthcheck' === $action ? array(
				'healthy'        => true,
				'plugin_version' => NPATI_HUB_VERSION,
			) : $this->dispatch( $action, $payload );
			$wpdb->update(
				$inbox_table,
				array(
					'processed_at' => current_time( 'mysql', true ),
					'status'       => 'processed',
				),
				array( 'request_id' => $request_id ),
				array( '%s', '%s' ),
				array( '%s' )
			);
			$this->audit->record( 'webhook', 'success', array( 'action' => $action ), $request_id );
			return rest_ensure_response(
				array(
					'ok'         => true,
					'request_id' => $request_id,
					'data'       => $result,
				)
			);
		} catch ( \Exception $e ) {
			$wpdb->update(
				$inbox_table,
				array(
					'processed_at' => current_time( 'mysql', true ),
					'status'       => 'failed',
				),
				array( 'request_id' => $request_id ),
				array( '%s', '%s' ),
				array( '%s' )
			);
			$this->audit->record( 'webhook', 'failed', array( 'action' => $action ), $request_id, 'processing_failed' );
			return new \WP_Error( 'processing_failed', sanitize_text_field( $e->getMessage() ), array( 'status' => 422 ) ); }
	}

	private function dispatch( $action, array $payload ) {
		if ( 'wordpress.content.generate' === $action ) {
			$task = is_array( $payload['task'] ?? null ) ? $payload['task'] : array();
			return $this->content->generate_article( $task );}
		if ( 'wordpress.posts.list' === $action ) {
			return $this->list_posts( is_array( $payload['query'] ?? null ) ? $payload['query'] : array() );}
		if ( 'wordpress.post.get' === $action ) {
			return $this->get_post_payload( absint( $payload['wordpress_post_id'] ?? 0 ) );}
		if ( 'wordpress.taxonomies.list' === $action ) {
			return $this->list_taxonomies();}
		if ( 'wordpress.media.list' === $action ) {
			return $this->list_media( is_array( $payload['query'] ?? null ) ? $payload['query'] : array() );}
		if ( 'wordpress.media.upload' === $action ) {
			return $this->upload_media( is_array( $payload['media'] ?? null ) ? $payload['media'] : array() );}
		if ( 'wordpress.media.delete' === $action ) {
			return $this->delete_media( absint( $payload['attachment_id'] ?? 0 ) );}
		if ( 'wordpress.category.create' === $action ) {
			return $this->create_term( 'category', is_array( $payload['term'] ?? null ) ? $payload['term'] : array() );}
		if ( 'wordpress.tag.create' === $action ) {
			return $this->create_term( 'post_tag', is_array( $payload['term'] ?? null ) ? $payload['term'] : array() );}
		if ( 'wordpress.category.delete' === $action ) {
			return $this->delete_term( 'category', absint( $payload['term_id'] ?? 0 ) );}
		if ( 'wordpress.tag.delete' === $action ) {
			return $this->delete_term( 'post_tag', absint( $payload['term_id'] ?? 0 ) );}
		if ( 0 !== strpos( $action, 'wordpress.post.' ) ) {
			update_option(
				'npati_hub_last_security_event',
				array(
					'action' => $action,
					'at'     => time(),
				),
				false
			);
			throw new \InvalidArgumentException( esc_html__( 'Unsupported WordPress command.', 'npati-content-automation' ) ); }
		$post                   = is_array( $payload['post'] ?? null ) ? $payload['post'] : array();
		$post_id                = absint( $payload['wordpress_post_id'] ?? 0 );
		$expected_hash          = sanitize_text_field( $payload['expected_content_hash'] ?? '' );
		$featured_attachment_id = array_key_exists( 'featured_media_id', $post ) ? absint( $post['featured_media_id'] ) : null;
		if ( $featured_attachment_id && ( 'attachment' !== get_post_type( $featured_attachment_id ) || ! wp_attachment_is_image( $featured_attachment_id ) ) ) {
			throw new \InvalidArgumentException( esc_html__( 'Featured media must be an image from this WordPress Media Library.', 'npati-content-automation' ) );}
		$existing = $post_id ? get_post( $post_id ) : null;
		if ( $post_id && ( ! $existing || 'post' !== $existing->post_type ) ) {
			throw new \RuntimeException( esc_html__( 'WordPress post was not found.', 'npati-content-automation' ) );}
		if ( $post_id && ( ! $expected_hash || ! hash_equals( $expected_hash, $this->post_hash( $existing ) ) ) ) {
			throw new \RuntimeException( esc_html__( 'Content changed in WordPress. Review the latest version before trying again.', 'npati-content-automation' ) );}
		if ( 'wordpress.post.delete' === $action ) {
			$snapshot = $this->get_post_payload( $post_id );
			$trashed  = wp_trash_post( $post_id );
			if ( ! $trashed ) {
				throw new \RuntimeException( esc_html__( 'WordPress could not move the post to Trash.', 'npati-content-automation' ) );
			}return array(
				'post'    => $snapshot,
				'deleted' => true,
				'status'  => 'trash',
			);}
		if ( 'wordpress.post.publish' === $action ) {
			if ( ! $this->settings->get( 'allow_remote_publish', false ) || 'high' === $this->settings->get( 'security_mode', 'standard' ) ) {
				throw new \RuntimeException( esc_html__( 'Remote publishing is disabled in NPATI plugin Settings.', 'npati-content-automation' ) );
			}$result = wp_update_post(
				array(
					'ID'          => $post_id,
					'post_status' => 'publish',
				),
				true
			);} else {
			$args = array( 'post_type' => 'post' );
			if ( ! $post_id ) {
				$title   = sanitize_text_field( $post['title'] ?? '' );
				$content = wp_kses_post( $post['content'] ?? '' );
				if ( ! $title || ! $content ) {
					throw new \InvalidArgumentException( esc_html__( 'Post title and content are required.', 'npati-content-automation' ) );
				}$args = array_merge(
					$args,
					array(
						'post_title'   => $title,
						'post_content' => $content,
						'post_status'  => 'draft',
						'post_author'  => $this->author(),
					)
				);
			} else {
				$args['ID'] = $post_id;
				if ( array_key_exists( 'title', $post ) ) {
					$args['post_title'] = sanitize_text_field( $post['title'] );
				}if ( array_key_exists( 'content', $post ) ) {
					$args['post_content'] = wp_kses_post( $post['content'] );
				}if ( array_key_exists( 'excerpt', $post ) ) {
					$args['post_excerpt'] = sanitize_textarea_field( $post['excerpt'] );
				}
			}
			$result = $post_id ? wp_update_post( $args, true ) : wp_insert_post( $args, true );
			}
			if ( is_wp_error( $result ) ) {
				throw new \RuntimeException( esc_html( $result->get_error_message() ) );}
			if ( array_key_exists( 'category_ids', $post ) ) {
				wp_set_post_categories( $result, array_values( array_filter( array_map( 'absint', (array) $post['category_ids'] ) ) ), false );}
			if ( array_key_exists( 'tag_ids', $post ) ) {
				wp_set_post_terms( $result, array_values( array_filter( array_map( 'absint', (array) $post['tag_ids'] ) ) ), 'post_tag', false );}
			if ( array_key_exists( 'featured_media_id', $post ) ) {
				if ( $featured_attachment_id ) {
						set_post_thumbnail( $result, $featured_attachment_id );
					if ( absint( get_post_thumbnail_id( $result ) ) !== $featured_attachment_id ) {
						throw new \RuntimeException( esc_html__( 'WordPress could not set the featured image.', 'npati-content-automation' ) );
					}
				} else {
					delete_post_thumbnail( $result );}
			}
			if ( ! empty( $post['seo'] ) && is_array( $post['seo'] ) ) {
				$this->save_seo( $result, $post['seo'] );}
			do_action( 'npati_hub/post/received', $result, $payload );
			return $this->get_post_payload( $result );
	}
	private function post_hash( $post ) {
		return hash( 'sha256', $post->post_title . "\n" . $post->post_content );}
	private function list_posts( array $query ) {
		$status  = sanitize_key( $query['status'] ?? 'any' );
		$allowed = array( 'any', 'draft', 'pending', 'publish', 'future', 'private' );
		if ( ! in_array( $status, $allowed, true ) ) {
			$status = 'any';
		}$wp_query = new \WP_Query(
			array(
				'post_type'      => 'post',
				'post_status'    => $status,
				'paged'          => max( 1, absint( $query['page'] ?? 1 ) ),
				'posts_per_page' => min( 50, max( 1, absint( $query['per_page'] ?? 20 ) ) ),
				's'              => sanitize_text_field( $query['search'] ?? '' ),
				'orderby'        => 'modified',
				'order'          => 'DESC',
				'no_found_rows'  => false,
			)
		);
		$items     = array();
		foreach ( $wp_query->posts as $post ) {
			$items[] = array(
				'post_id'      => $post->ID,
				'title'        => get_the_title( $post ),
				'status'       => $post->post_status,
				'excerpt'      => get_the_excerpt( $post ),
				'modified_at'  => get_post_modified_time( 'c', true, $post ),
				'updated_at'   => get_post_modified_time( 'c', true, $post ),
				'url'          => get_permalink( $post ),
				'content_hash' => $this->post_hash( $post ),
			);
		}return array(
			'items'      => $items,
			'pagination' => array(
				'page'  => max( 1, absint( $query['page'] ?? 1 ) ),
				'pages' => (int) $wp_query->max_num_pages,
				'total' => (int) $wp_query->found_posts,
			),
		);}
	private function get_post_payload( $post_id ) {
		$post = get_post( absint( $post_id ) );
		if ( ! $post || 'post' !== $post->post_type ) {
			throw new \RuntimeException( esc_html__( 'WordPress post was not found.', 'npati-content-automation' ) );
		}return array(
			'post_id'           => $post->ID,
			'title'             => $post->post_title,
			'content'           => $post->post_content,
			'excerpt'           => $post->post_excerpt,
			'status'            => $post->post_status,
			'created_at'        => get_post_time( 'c', true, $post ),
			'modified_at'       => get_post_modified_time( 'c', true, $post ),
			'url'               => get_permalink( $post ),
			'permalink'         => get_permalink( $post ),
			'preview_url'       => get_preview_post_link( $post ),
			'edit_url'          => get_edit_post_link( $post->ID, 'raw' ),
			'category_ids'      => wp_get_post_categories( $post->ID ),
			'tag_ids'           => wp_get_post_tags( $post->ID, array( 'fields' => 'ids' ) ),
			'featured_media_id' => get_post_thumbnail_id( $post->ID ) ? get_post_thumbnail_id( $post->ID ) : null,
			'seo'               => array(
				'meta_title'       => get_post_meta( $post->ID, '_npati_meta_title', true ) ? get_post_meta( $post->ID, '_npati_meta_title', true ) : get_post_meta( $post->ID, '_yoast_wpseo_title', true ),
				'meta_description' => get_post_meta( $post->ID, '_npati_meta_description', true ) ? get_post_meta( $post->ID, '_npati_meta_description', true ) : get_post_meta( $post->ID, '_yoast_wpseo_metadesc', true ),
				'focus_keyphrase'  => get_post_meta( $post->ID, '_yoast_wpseo_focuskw', true ),
				'canonical'        => get_post_meta( $post->ID, '_yoast_wpseo_canonical', true ),
			),
			'content_hash'      => $this->post_hash( $post ),
		);}
	private function list_taxonomies() {
		$categories = get_terms(
			array(
				'taxonomy'   => 'category',
				'hide_empty' => false,
				'number'     => 500,
			)
		);
		$tags       = get_terms(
			array(
				'taxonomy'   => 'post_tag',
				'hide_empty' => false,
				'number'     => 500,
			)
		);
		if ( is_wp_error( $categories ) || is_wp_error( $tags ) ) {
			throw new \RuntimeException( esc_html__( 'Unable to load WordPress taxonomies.', 'npati-content-automation' ) );
		}$map = static function ( $term ) {
			return array(
				'term_id'     => (int) $term->term_id,
				'name'        => $term->name,
				'slug'        => $term->slug,
				'description' => $term->description,
				'parent_id'   => (int) $term->parent,
				'count'       => (int) $term->count,
			);
		};
		return array(
			'categories' => array_map( $map, $categories ),
			'tags'       => array_map( $map, $tags ),
		);}
	private function list_media( array $query ) {
		$page  = max( 1, absint( $query['page'] ?? 1 ) );
		$media = new \WP_Query(
			array(
				'post_type'      => 'attachment',
				'post_status'    => 'inherit',
				'post_mime_type' => array( 'image', 'video' ),
				'paged'          => $page,
				'posts_per_page' => min( 50, max( 1, absint( $query['per_page'] ?? 20 ) ) ),
				's'              => sanitize_text_field( $query['search'] ?? '' ),
				'orderby'        => 'date',
				'order'          => 'DESC',
				'no_found_rows'  => false,
			)
		);
		$items = array();
		foreach ( $media->posts as $attachment ) {
			$items[] = $this->media_payload( $attachment->ID );
		}return array(
			'items'      => $items,
			'pagination' => array(
				'page'  => $page,
				'pages' => (int) $media->max_num_pages,
				'total' => (int) $media->found_posts,
			),
		);}
	private function upload_media( array $media ) {
		$source = esc_url_raw( (string) ( $media['source_url'] ?? '' ), array( 'https' ) );
		if ( ! $source || 'https' !== wp_parse_url( $source, PHP_URL_SCHEME ) ) {
			throw new \InvalidArgumentException( esc_html__( 'A secure media URL is required.', 'npati-content-automation' ) );
		}$filename = sanitize_file_name( (string) ( $media['filename'] ?? wp_basename( wp_parse_url( $source, PHP_URL_PATH ) ) ) );
		if ( ! $filename ) {
			$filename = 'npati-media';
		}require_once ABSPATH . 'wp-admin/includes/file.php';
		require_once ABSPATH . 'wp-admin/includes/media.php';
		require_once ABSPATH . 'wp-admin/includes/image.php';
		$temporary = download_url( $source, 180 );
		if ( is_wp_error( $temporary ) ) {
			throw new \RuntimeException( esc_html( $temporary->get_error_message() ) );
		}$checked = wp_check_filetype_and_ext( $temporary, $filename );
		$mime     = (string) ( $checked['type'] ?? '' );
		if ( ! preg_match( '#^(image/(jpeg|png|gif|webp)|video/(mp4|quicktime|webm))$#', $mime ) ) {
			wp_delete_file( $temporary );
			throw new \InvalidArgumentException( esc_html__( 'WordPress supports JPG, PNG, GIF, WebP, MP4, MOV or WebM media here.', 'npati-content-automation' ) );
		}$limit = 0 === strpos( $mime, 'video/' ) ? 250 * MB_IN_BYTES : 20 * MB_IN_BYTES;
		if ( filesize( $temporary ) > $limit ) {
			wp_delete_file( $temporary );
			throw new \InvalidArgumentException( esc_html__( 'The WordPress media file is too large.', 'npati-content-automation' ) );
		}$file         = array(
			'name'     => $filename,
			'tmp_name' => $temporary,
		);
		$attachment_id = media_handle_sideload( $file, 0, sanitize_text_field( $media['title'] ?? pathinfo( $filename, PATHINFO_FILENAME ) ) );
		if ( is_wp_error( $attachment_id ) ) {
			if ( file_exists( $temporary ) ) {
				wp_delete_file( $temporary );
			}throw new \RuntimeException( esc_html( $attachment_id->get_error_message() ) );
		}if ( array_key_exists( 'alt_text', $media ) ) {
			update_post_meta( $attachment_id, '_wp_attachment_image_alt', sanitize_text_field( $media['alt_text'] ) );
		}if ( array_key_exists( 'caption', $media ) ) {
			wp_update_post(
				array(
					'ID'           => $attachment_id,
					'post_excerpt' => sanitize_textarea_field( $media['caption'] ),
				)
			);
		}return $this->media_payload( $attachment_id );}
	private function media_payload( $attachment_id ) {
		$attachment = get_post( absint( $attachment_id ) );
		$mime       = $attachment ? (string) get_post_mime_type( $attachment->ID ) : '';
		if ( ! $attachment || 'attachment' !== $attachment->post_type || ! preg_match( '#^(image|video)/#', $mime ) ) {
			throw new \RuntimeException( esc_html__( 'WordPress media file was not found.', 'npati-content-automation' ) );
		}$url = wp_get_attachment_url( $attachment->ID );
		$file = get_attached_file( $attachment->ID );
		return array(
			'attachment_id' => (int) $attachment->ID,
			'url'           => esc_url_raw( $url ),
			'filename'      => sanitize_file_name( wp_basename( $file ? $file : wp_parse_url( $url, PHP_URL_PATH ) ) ),
			'mime_type'     => $mime,
			'media_type'    => 0 === strpos( $mime, 'video/' ) ? 'video' : 'image',
			'title'         => $attachment->post_title,
			'alt_text'      => (string) get_post_meta( $attachment->ID, '_wp_attachment_image_alt', true ),
			'caption'       => $attachment->post_excerpt,
		);}
	private function delete_media( $attachment_id ) {
		$snapshot = $this->media_payload( $attachment_id );
		$deleted  = wp_delete_attachment( absint( $attachment_id ), true );
		if ( ! $deleted ) {
			throw new \RuntimeException( esc_html__( 'WordPress could not delete the media file.', 'npati-content-automation' ) );
		}return array(
			'media'   => $snapshot,
			'deleted' => true,
		);}
	private function create_term( $taxonomy, array $data ) {
		$name = sanitize_text_field( $data['name'] ?? '' );
		if ( ! $name ) {
			throw new \InvalidArgumentException( esc_html__( 'Term name is required.', 'npati-content-automation' ) );
		}$existing = term_exists( $name, $taxonomy );
		if ( $existing ) {
			$term = get_term( is_array( $existing ) ? $existing['term_id'] : $existing, $taxonomy );
			return array(
				'term_id'  => (int) $term->term_id,
				'name'     => $term->name,
				'slug'     => $term->slug,
				'taxonomy' => $taxonomy,
				'existing' => true,
			);
		}$args = array( 'description' => sanitize_textarea_field( $data['description'] ?? '' ) );
		if ( ! empty( $data['slug'] ) ) {
			$args['slug'] = sanitize_title( $data['slug'] );
		}if ( 'category' === $taxonomy && ! empty( $data['parent_id'] ) ) {
			$args['parent'] = absint( $data['parent_id'] );
		}$created = wp_insert_term( $name, $taxonomy, $args );
		if ( is_wp_error( $created ) ) {
			throw new \RuntimeException( esc_html( $created->get_error_message() ) );
		}$term = get_term( $created['term_id'], $taxonomy );
		return array(
			'term_id'  => (int) $term->term_id,
			'name'     => $term->name,
			'slug'     => $term->slug,
			'taxonomy' => $taxonomy,
			'existing' => false,
		);}
	private function delete_term( $taxonomy, $term_id ) {
		$term = get_term( absint( $term_id ), $taxonomy );
		if ( ! $term || is_wp_error( $term ) ) {
			throw new \RuntimeException( esc_html__( 'WordPress term was not found.', 'npati-content-automation' ) );
		}$snapshot = array(
			'term_id'  => (int) $term->term_id,
			'name'     => $term->name,
			'slug'     => $term->slug,
			'taxonomy' => $taxonomy,
		);
		$deleted   = wp_delete_term( $term->term_id, $taxonomy );
		if ( is_wp_error( $deleted ) ) {
			throw new \RuntimeException( esc_html( $deleted->get_error_message() ) );
		}if ( ! $deleted ) {
			throw new \RuntimeException( esc_html__( 'WordPress could not delete the term.', 'npati-content-automation' ) );
		}return array(
			'term'    => $snapshot,
			'deleted' => true,
		);}
	private function author() {
		$id = absint( $this->settings->get( 'default_author', 0 ) );
		if ( $id && user_can( $id, 'edit_posts' ) ) {
			return $id;
		}$users = get_users(
			array(
				'role__in' => array( 'administrator', 'editor', 'author' ),
				'number'   => 1,
				'fields'   => 'ids',
			)
		);
		return $users ? absint( $users[0] ) : 0; }
	private function save_seo( $post_id, array $seo ) {
		$title       = $seo['meta_title'] ?? ( $seo['title'] ?? null );
		$description = $seo['meta_description'] ?? ( $seo['description'] ?? null );
		if ( null !== $title ) {
			$value = sanitize_text_field( $title );
			update_post_meta( $post_id, '_yoast_wpseo_title', $value );
			update_post_meta( $post_id, '_npati_meta_title', $value );
		}if ( null !== $description ) {
			$value = sanitize_text_field( $description );
			update_post_meta( $post_id, '_yoast_wpseo_metadesc', $value );
			update_post_meta( $post_id, '_npati_meta_description', $value );
		}if ( isset( $seo['focus_keyphrase'] ) ) {
			update_post_meta( $post_id, '_yoast_wpseo_focuskw', sanitize_text_field( $seo['focus_keyphrase'] ) );
		}if ( isset( $seo['canonical'] ) ) {
			update_post_meta( $post_id, '_yoast_wpseo_canonical', esc_url_raw( $seo['canonical'], array( 'http', 'https' ) ) );
		}}
}
