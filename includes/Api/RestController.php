<?php
namespace NPATI\Hub\Api;

use NPATI\Hub\Auth\ConnectionService;
use NPATI\Hub\Core\Settings;
use NPATI\Hub\Database\AuditLog;
use NPATI\Hub\Security\WebhookController;
use NPATI\Hub\Seo\NativeSeoAnalyzer;
use NPATI\Hub\Content\ContentService;
use NPATI\Hub\Content\ProviderRegistry;
use NPATI\Hub\Content\TaskImporter;

defined( 'ABSPATH' ) || exit;

final class RestController {
	private $settings;
	private $client;
	private $connection;
	private $audit;
	private $content;
	public function __construct( Settings $settings, Client $client, ConnectionService $connection, AuditLog $audit, ContentService $content ) {
		$this->settings   = $settings;
		$this->client     = $client;
		$this->connection = $connection;
		$this->audit      = $audit;
		$this->content    = $content; }
	public function register() {
		add_action( 'rest_api_init', array( $this, 'routes' ) ); }
	public function routes() {
		register_rest_route(
			'npati/v1',
			'/status',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'status' ),
				'permission_callback' => array( $this, 'can_view' ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/connect',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'connect' ),
				'permission_callback' => array( $this, 'can_connect' ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/disconnect',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'disconnect' ),
				'permission_callback' => array( $this, 'can_connect' ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/profile',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'profile' ),
				'permission_callback' => array( $this, 'can_view' ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/profile/avatar',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'profile_avatar' ),
				'permission_callback' => array( $this, 'can_upload' ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/market/listings',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'listings' ),
				'permission_callback' => array( $this, 'can_view' ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/market/listings/(?P<id>[0-9a-f-]+)/like',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'toggle_listing_like' ),
				'permission_callback' => array( $this, 'can_market' ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/market/videos/(?P<id>[0-9a-f-]+)/viewer',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'video_viewer' ),
				'permission_callback' => array( $this, 'can_view' ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/market/videos/(?P<id>[0-9a-f-]+)/action',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'video_action' ),
				'permission_callback' => array( $this, 'can_market' ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/market/videos/(?P<id>[0-9a-f-]+)/comments',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'video_comment' ),
				'permission_callback' => array( $this, 'can_market' ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/market/videos/(?P<id>[0-9a-f-]+)/comments/(?P<comment_id>[0-9a-f-]+)/like',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'video_comment_like' ),
				'permission_callback' => array( $this, 'can_market' ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/market/listing-schema',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'listing_schema' ),
				'permission_callback' => array( $this, 'can_market' ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/market/addresses',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'addresses' ),
				'permission_callback' => array( $this, 'can_market' ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/market/addresses',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'create_address' ),
				'permission_callback' => array( $this, 'can_market' ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/market/address-options',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'address_options' ),
				'permission_callback' => array( $this, 'can_market' ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/market/listings',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'create_listing' ),
				'permission_callback' => array( $this, 'can_market' ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/market/listings/(?P<id>[0-9a-f-]+)',
			array(
				'methods'             => array( 'PUT', 'DELETE' ),
				'callback'            => array( $this, 'listing_item' ),
				'permission_callback' => array( $this, 'can_market' ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/market/media/import',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'import_listing_media' ),
				'permission_callback' => array( $this, 'can_upload' ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/hub/posts',
			array(
				'methods'             => array( 'GET', 'POST' ),
				'callback'            => array( $this, 'hub_posts' ),
				'permission_callback' => array( $this, 'can_publish' ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/hub/posts/(?P<id>[0-9a-f-]+)',
			array(
				'methods'             => 'PATCH',
				'callback'            => array( $this, 'update_post' ),
				'permission_callback' => array( $this, 'can_publish' ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/hub/posts/(?P<id>[0-9a-f-]+)/(?:schedule|publish)',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'post_action' ),
				'permission_callback' => array( $this, 'can_publish' ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/hub/posts/(?P<id>[0-9a-f-]+)',
			array(
				'methods'             => 'DELETE',
				'callback'            => array( $this, 'cancel_post' ),
				'permission_callback' => array( $this, 'can_publish' ),
				'args'                => array( 'id' => array( 'sanitize_callback' => 'sanitize_text_field' ) ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/hub/posts/(?P<id>[0-9a-f-]+)/retry',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'retry_post' ),
				'permission_callback' => array( $this, 'can_publish' ),
				'args'                => array( 'id' => array( 'sanitize_callback' => 'sanitize_text_field' ) ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/hub/connections',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'hub_connections' ),
				'permission_callback' => array( $this, 'can_publish' ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/hub/summary',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'hub_summary' ),
				'permission_callback' => array( $this, 'can_view' ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/hub/media',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'hub_media' ),
				'permission_callback' => array( $this, 'can_publish' ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/hub/media/import',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'import_media' ),
				'permission_callback' => array( $this, 'can_upload' ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/content/ai',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'content_ai_status' ),
				'permission_callback' => array( $this, 'can_content' ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/content/ai/test',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'content_ai_test' ),
				'permission_callback' => array( $this, 'can_content' ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/content/ai',
			array(
				'methods'             => array( 'POST', 'DELETE' ),
				'callback'            => array( $this, 'content_ai_connection' ),
				'permission_callback' => array( $this, 'can_content' ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/content/import',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'content_import' ),
				'permission_callback' => array( $this, 'can_content' ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/content/import/(?P<token>[a-zA-Z0-9]+)',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'content_import_page' ),
				'permission_callback' => array( $this, 'can_content' ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/content/categories',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'content_categories' ),
				'permission_callback' => array( $this, 'can_content' ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/content/tasks/batch',
			array(
				'methods'             => array( 'PATCH', 'DELETE' ),
				'callback'            => array( $this, 'content_tasks_batch' ),
				'permission_callback' => array( $this, 'can_content' ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/content/tasks',
			array(
				'methods'             => array( 'GET', 'POST' ),
				'callback'            => array( $this, 'content_tasks' ),
				'permission_callback' => array( $this, 'can_content' ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/content/tasks/(?P<id>[0-9a-f-]+)',
			array(
				'methods'             => array( 'PATCH', 'DELETE' ),
				'callback'            => array( $this, 'content_task' ),
				'permission_callback' => array( $this, 'can_content' ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/content/tasks/(?P<id>[0-9a-f-]+)/permanent',
			array(
				'methods'             => 'DELETE',
				'callback'            => array( $this, 'content_task_permanent' ),
				'permission_callback' => array( $this, 'can_content' ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/content/social/(?P<id>\d+)',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'content_social' ),
				'permission_callback' => array( $this, 'can_content' ),
			)
		);
		register_rest_route(
			'npati/v1',
			'/seo/check/(?P<id>\d+)',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'seo' ),
				'permission_callback' => static function ( $request ) {
					return current_user_can( 'edit_post', absint( $request['id'] ) );
				},
				'args'                => array(
					'id' => array(
						'validate_callback' => static function ( $value ) {
								return absint( $value ) > 0;
						},
					),
				),
			)
		);
		( new WebhookController( $this->settings, $this->audit, $this->content ) )->route();
	}
	public function can_view() {
		return current_user_can( 'npati_view' ); }
	public function can_connect() {
		return current_user_can( 'npati_manage_connection' ); }
	public function can_publish() {
		return current_user_can( 'npati_publish' ); }
	public function can_market() {
		return current_user_can( 'npati_manage_market' ); }
	public function can_upload() {
		return current_user_can( 'npati_publish' ) && current_user_can( 'upload_files' ); }
	public function can_content() {
		return current_user_can( 'npati_manage_hub' ) && current_user_can( 'edit_posts' ); }
	public function content_ai_status() {
		$provider = ( new ProviderRegistry() )->get( 'openai' );
		return rest_ensure_response(
			array(
				'provider'  => 'openai',
				'connected' => $provider->is_connected(),
				'model'     => $provider->selected_model(),
				'keyHint'   => $provider->is_connected() ? '********' : '',
			)
		); }
	public function content_ai_test( \WP_REST_Request $request ) {
		try {
			$provider = ( new ProviderRegistry() )->get( 'openai' );
			return rest_ensure_response( $provider->test( (string) $request->get_param( 'apiKey' ), sanitize_text_field( (string) $request->get_param( 'model' ) ) ) );
		} catch ( \Exception $e ) {
			return $this->error( $e );}}
	public function content_ai_connection( \WP_REST_Request $request ) {
		try {
			$provider = ( new ProviderRegistry() )->get( 'openai' );
			if ( 'DELETE' === $request->get_method() ) {
				$provider->disconnect();
				return rest_ensure_response( array( 'connected' => false ) );
			}$key = (string) $request->get_param( 'apiKey' );
			if ( ! $key ) {
				return new \WP_Error( 'api_key_required', __( 'Enter the OpenAI API key again when saving.', 'npati-content-automation' ), array( 'status' => 422 ) );
			}return rest_ensure_response( $provider->connect( $key, (string) $request->get_param( 'model' ) ) );
		} catch ( \Exception $e ) {
			return $this->error( $e );}}
	public function content_import( \WP_REST_Request $request ) {
		try {
			$files = $request->get_file_params();
			if ( empty( $files['file'] ) ) {
				return new \WP_Error( 'file_required', __( 'Choose a CSV or XLSX file.', 'npati-content-automation' ), array( 'status' => 422 ) );
			}return rest_ensure_response( ( new TaskImporter() )->import( $files['file'] ) );
		} catch ( \Exception $e ) {
			return $this->error( $e );}}
	public function content_import_page( \WP_REST_Request $request ) {
		try {
			return rest_ensure_response( ( new TaskImporter() )->page( (string) $request['token'], absint( $request->get_param( 'offset' ) ) ) );
		} catch ( \Exception $e ) {
			return $this->error( $e );}}
	public function content_categories() {
		$terms = get_categories(
			array(
				'taxonomy'   => 'category',
				'hide_empty' => false,
				'orderby'    => 'name',
				'order'      => 'ASC',
				'number'     => 500,
			)
		);
		if ( is_wp_error( $terms ) ) {
			return $terms;
		}
		return rest_ensure_response(
			array_map(
				static function ( $term ) {
					return array(
						'id'    => (int) $term->term_id,
						'name'  => (string) $term->name,
						'slug'  => (string) $term->slug,
						'count' => (int) $term->count,
					);
				},
				$terms
			)
		);
	}
	public function content_tasks( \WP_REST_Request $request ) {
		try {
			if ( 'GET' === $request->get_method() ) {
				$limit = $request->get_param( 'limit' );
				return rest_ensure_response( $this->client->get( '/content/tasks', array( 'limit' => min( 500, max( 1, absint( $limit ? $limit : 200 ) ) ) ) ) );
			}$input = $request->get_json_params();
			return rest_ensure_response( $this->client->post( '/content/tasks/batch', array( 'items' => array_slice( (array) ( $input['items'] ?? array() ), 0, 100 ) ), 'content-' . wp_generate_uuid4(), 30 ) );
		} catch ( \Exception $e ) {
			return $this->error( $e );}}
	public function content_tasks_batch( \WP_REST_Request $request ) {
		try {
			$input = (array) $request->get_json_params();
			$ids   = array_values( array_unique( array_filter( array_map( 'sanitize_text_field', array_slice( (array) ( $input['ids'] ?? array() ), 0, 100 ) ) ) ) );
			if ( ! $ids ) {
				return new \WP_Error( 'task_ids_required', __( 'Select at least one Content task.', 'npati-content-automation' ), array( 'status' => 422 ) );
			}$body = array( 'ids' => $ids );
			if ( 'PATCH' === $request->get_method() ) {
				$body['scheduledFor'] = sanitize_text_field( (string) ( $input['scheduledFor'] ?? '' ) );
				$body['timezone']     = sanitize_text_field( (string) ( $input['timezone'] ?? wp_timezone_string() ) );
				return rest_ensure_response( $this->client->patch( '/content/tasks/batch', $body, 'content-bulk-' . wp_generate_uuid4() ) );
			}return rest_ensure_response( $this->client->delete( '/content/tasks/batch', $body ) );
		} catch ( \Exception $e ) {
			return $this->error( $e );}}
	public function content_task_permanent( \WP_REST_Request $request ) {
		try {
			return rest_ensure_response( $this->client->delete( '/content/tasks/' . rawurlencode( (string) $request['id'] ) . '/permanent' ) );
		} catch ( \Exception $e ) {
			return $this->error( $e );}}
	public function content_task( \WP_REST_Request $request ) {
		try {
			$path = '/content/tasks/' . rawurlencode( (string) $request['id'] );
			if ( 'DELETE' === $request->get_method() ) {
				return rest_ensure_response( $this->client->delete( $path ) );
			}return rest_ensure_response( $this->client->patch( $path, (array) $request->get_json_params() ) );
		} catch ( \Exception $e ) {
			return $this->error( $e );}}
	public function content_social( \WP_REST_Request $request ) {
		try {
			return rest_ensure_response( $this->content->generate_social_post( absint( $request['id'] ) ) );
		} catch ( \Exception $e ) {
			return $this->error( $e );}}
	public function status() {
		$connection   = $this->connection->status();
		$capabilities = array( 'features' => array() );
		if ( ! empty( $connection['connected'] ) ) {
			try {
				$capabilities = $this->client->get( '/wordpress/capabilities', array(), 5 * MINUTE_IN_SECONDS );
			} catch ( \Exception $ignored ) {
			}
		}return rest_ensure_response(
			array(
				'connection'     => $connection,
				'capabilities'   => $capabilities,
				'market'         => $this->settings->get( 'market', 'US' ),
				'plugin_version' => NPATI_HUB_VERSION,
			)
		); }
	public function connect( \WP_REST_Request $request ) {
		try {
			$intent = 'register' === sanitize_key( (string) $request->get_param( 'intent' ) ) ? 'register' : 'login';
			return rest_ensure_response( $this->connection->begin( $intent ) );
		} catch ( \Exception $e ) {
			return $this->error( $e ); } }
	public function disconnect() {
		return rest_ensure_response( $this->connection->disconnect() ); }
	public function profile() {
		try {
			$profile = $this->client->get( '/profile', array(), 15 * MINUTE_IN_SECONDS );
			if ( is_array( $profile ) ) {
				set_transient( 'npati_hub_profile', $profile, 15 * MINUTE_IN_SECONDS );
			}return rest_ensure_response( $profile );
		} catch ( \Exception $e ) {
			return $this->error( $e ); } }
	public function profile_avatar( \WP_REST_Request $request ) {
		try {
			$attachment_id = absint( $request->get_param( 'attachmentId' ) );
			if ( ! $attachment_id || 'attachment' !== get_post_type( $attachment_id ) || ! current_user_can( 'edit_post', $attachment_id ) ) {
				return new \WP_Error( 'invalid_attachment', __( 'Select an image you can access.', 'npati-content-automation' ), array( 'status' => 403 ) );
			}$url = wp_get_attachment_url( $attachment_id );
			$mime = get_post_mime_type( $attachment_id );
			$file = get_attached_file( $attachment_id );
			if ( ! $url || ! preg_match( '#^image/(jpeg|png|webp|gif)$#', (string) $mime ) ) {
				return new \WP_Error( 'unsupported_avatar', __( 'Choose a JPG, PNG, WebP or GIF image.', 'npati-content-automation' ), array( 'status' => 422 ) );
			}if ( $file && filesize( $file ) > 5 * MB_IN_BYTES ) {
				return new \WP_Error( 'avatar_too_large', __( 'The profile photo must be 5 MB or smaller.', 'npati-content-automation' ), array( 'status' => 413 ) );
			}$profile = $this->client->post(
				'/profile/avatar/import',
				array(
					'url'  => esc_url_raw( $url ),
					'name' => sanitize_file_name( wp_basename( $file ? $file : $url ) ),
				),
				'profile-avatar-' . wp_generate_uuid4(),
				60
			);
			if ( is_array( $profile ) ) {
				set_transient( 'npati_hub_profile', $profile, 15 * MINUTE_IN_SECONDS );
			}return rest_ensure_response( $profile );
		} catch ( \Exception $e ) {
			return $this->error( $e );}}
	public function listings( \WP_REST_Request $request ) {
		try {
			$status_param = $request->get_param( 'status' );
			$status       = sanitize_key( $status_param ? $status_param : 'active' );
			if ( ! in_array( $status, array( 'active', 'pending', 'rejected', 'archived', 'draft' ), true ) ) {
				$status = 'active';
			}return rest_ensure_response(
				$this->client->get(
					'/listings',
					array(
						'country' => $this->settings->get( 'market', 'US' ),
						'status'  => $status,
					)
				)
			);
		} catch ( \Exception $e ) {
			return $this->error( $e ); } }
	public function toggle_listing_like( \WP_REST_Request $request ) {
		try {
			return rest_ensure_response( $this->client->post( '/listings/' . rawurlencode( (string) $request['id'] ) . '/like', array(), 'listing-like-' . wp_generate_uuid4(), 15 ) );
		} catch ( \Exception $e ) {
			return $this->error( $e ); } }
	public function video_viewer( \WP_REST_Request $request ) {
		try {
			return rest_ensure_response( $this->client->get( '/listings/videos/' . rawurlencode( (string) $request['id'] ) . '/viewer', array() ) );
		} catch ( \Exception $e ) {
			return $this->error( $e );}}
	public function video_action( \WP_REST_Request $request ) {
		try {
			$action = sanitize_key( (string) $request->get_param( 'action' ) );
			if ( ! in_array( $action, array( 'like', 'save', 'share' ), true ) ) {
				return new \WP_Error( 'invalid_video_action', __( 'Invalid video action.', 'npati-content-automation' ), array( 'status' => 422 ) );
			}return rest_ensure_response( $this->client->post( '/listings/videos/' . rawurlencode( (string) $request['id'] ) . '/action', array( 'action' => $action ), 'video-' . $action . '-' . wp_generate_uuid4(), 15 ) );
		} catch ( \Exception $e ) {
			return $this->error( $e );}}
	public function video_comment( \WP_REST_Request $request ) {
		try {
			$comment = sanitize_textarea_field( (string) $request->get_param( 'comment' ) );
			if ( '' === $comment || strlen( $comment ) > 5000 ) {
				return new \WP_Error( 'invalid_video_comment', __( 'Enter a valid comment.', 'npati-content-automation' ), array( 'status' => 422 ) );
			}$body     = array( 'comment' => $comment );
			$parent_id = sanitize_text_field( (string) $request->get_param( 'parentId' ) );
			if ( $parent_id ) {
				$body['parentId'] = $parent_id;
			}return rest_ensure_response( $this->client->post( '/listings/videos/' . rawurlencode( (string) $request['id'] ) . '/comments', $body, 'video-comment-' . wp_generate_uuid4(), 15 ) );
		} catch ( \Exception $e ) {
			return $this->error( $e );}}
	public function video_comment_like( \WP_REST_Request $request ) {
		try {
			return rest_ensure_response( $this->client->post( '/listings/videos/' . rawurlencode( (string) $request['id'] ) . '/comments/' . rawurlencode( (string) $request['comment_id'] ) . '/like', array(), 'video-comment-like-' . wp_generate_uuid4(), 15 ) );
		} catch ( \Exception $e ) {
			return $this->error( $e );}}
	public function listing_schema() {
		$market = strtoupper( (string) $this->settings->get( 'market', 'US' ) );
		delete_transient( 'npati_hub_circuit_open' );
		try {
			// Account addresses are mutable and must be fresh every time the create
			// screen opens. The Hub/backend may cache the public category catalogue.
			return rest_ensure_response( $this->client->get( '/listings/form-schema', array( 'country' => $market ) ) );
		} catch ( \Exception $e ) {
			// Older Hub deployments do not expose /listings/form-schema yet. The
			// category catalogue is public, so keep the create screen usable while
			// the account-only address list remains unavailable.
			return rest_ensure_response( $this->public_listing_schema( $market, $e->getMessage() ) );
		}
	}
	private function public_listing_schema( $market, $warning = '' ) {
		$market    = in_array( $market, array( 'US', 'UA', 'CA', 'GB' ), true ) ? $market : 'US';
		$cache_key = 'npati_public_listing_schema_' . strtolower( $market );
		$cached    = get_transient( $cache_key );
		if ( is_array( $cached ) && ! empty( $cached['categories'] ) ) {
			$cached['warning'] = sanitize_text_field( (string) $warning );
			return $cached;
		}
		$url        = add_query_arg(
			array(
				'entityType' => 'product',
				'country'    => $market,
				'status'     => 'published',
				'limit'      => 1000,
				'lang'       => 'UA' === $market ? 'ua' : 'en',
			),
			'https://api.npati.com/api/v1/categories'
		);
		$response   = wp_safe_remote_get(
			$url,
			array(
				'timeout'             => 15,
				'redirection'         => 2,
				'sslverify'           => true,
				'limit_response_size' => 5 * MB_IN_BYTES,
			)
		);
		$categories = array();
		if ( ! is_wp_error( $response ) && 200 === wp_remote_retrieve_response_code( $response ) ) {
			$payload = json_decode( wp_remote_retrieve_body( $response ), true );
			if ( is_array( $payload ) ) {
				$categories = isset( $payload['data'] ) && is_array( $payload['data'] ) ? $payload['data'] : ( array_values( $payload ) === $payload ? $payload : array() );
			}
		}
		$schema = array(
			'country'    => $market,
			'categories' => $categories,
			'addresses'  => array(),
			'warning'    => sanitize_text_field( (string) $warning ),
			'fallback'   => true,
		);
		if ( $categories ) {
			set_transient( $cache_key, $schema, HOUR_IN_SECONDS ); }
		return $schema;
	}
	public function addresses() {
		try {
			return rest_ensure_response( $this->client->get( '/listings/addresses' ) ); } catch ( \Exception $e ) {
			return $this->error( $e ); }
	}
	public function create_address( \WP_REST_Request $request ) {
		try {
			$input   = $request->get_json_params();
			$allowed = array( 'addressType', 'isDefault', 'isResidential', 'firstName', 'lastName', 'name', 'company', 'phone', 'email', 'street1', 'street2', 'city', 'state', 'zip', 'country', 'deliveryMetadata', 'shippoValidated' );
			$body    = array_intersect_key( is_array( $input ) ? $input : array(), array_flip( $allowed ) );
			foreach ( array( 'addressType', 'firstName', 'lastName', 'name', 'company', 'phone', 'street1', 'street2', 'city', 'state', 'zip' ) as $key ) {
				if ( isset( $body[ $key ] ) ) {
					$body[ $key ] = sanitize_text_field( (string) $body[ $key ] ); }
			}
			if ( isset( $body['email'] ) ) {
				$body['email'] = sanitize_email( $body['email'] ); }
			$market                = strtoupper( (string) $this->settings->get( 'market', 'US' ) );
			$body['country']       = in_array( $market, array( 'US', 'UA', 'CA', 'GB' ), true ) ? $market : 'US';
			$body['isDefault']     = ! empty( $body['isDefault'] );
			$body['isResidential'] = ! isset( $body['isResidential'] ) || ! empty( $body['isResidential'] );
			if ( isset( $body['deliveryMetadata'] ) && is_array( $body['deliveryMetadata'] ) ) {
				$body['deliveryMetadata'] = map_deep( $body['deliveryMetadata'], 'sanitize_text_field' );
			}
			return rest_ensure_response( $this->client->post( '/listings/addresses', $body, 'address-' . wp_generate_uuid4(), 20 ) );
		} catch ( \Exception $e ) {
			return $this->error( $e ); }
	}
	public function address_options( \WP_REST_Request $request ) {
		try {
			$type = sanitize_key( (string) $request->get_param( 'type' ) );
			if ( 'cities' === $type ) {
				return rest_ensure_response(
					$this->client->get(
						'/listings/addresses/nova-poshta/cities',
						array(
							'query' => sanitize_text_field( (string) $request->get_param( 'query' ) ),
							'limit' => 20,
						)
					)
				);
			}
			if ( 'warehouses' === $type ) {
				$city_ref = sanitize_text_field( (string) $request->get_param( 'cityRef' ) );
				if ( ! $city_ref ) {
					return new \WP_Error( 'city_required', __( 'Select a city first.', 'npati-content-automation' ), array( 'status' => 422 ) ); }
				return rest_ensure_response(
					$this->client->get(
						'/listings/addresses/nova-poshta/warehouses',
						array(
							'cityRef'         => $city_ref,
							'deliveryCityRef' => sanitize_text_field( (string) $request->get_param( 'deliveryCityRef' ) ),
							'search'          => sanitize_text_field( (string) $request->get_param( 'search' ) ),
						)
					)
				);
			}
			if ( 'postal' === $type ) {
				$postal_code = preg_replace( '/\D+/', '', (string) $request->get_param( 'postalCode' ) );
				if ( 5 !== strlen( $postal_code ) ) {
					return new \WP_Error( 'invalid_postal_code', __( 'Enter a valid five-digit postal code.', 'npati-content-automation' ), array( 'status' => 422 ) ); }
				return rest_ensure_response(
					$this->client->get(
						'/listings/addresses/nova-poshta/validate-postal-code',
						array(
							'postalCode' => $postal_code,
							'cityRef'    => sanitize_text_field( (string) $request->get_param( 'cityRef' ) ),
						)
					)
				);
			}
			return new \WP_Error( 'invalid_address_option', __( 'Invalid address lookup.', 'npati-content-automation' ), array( 'status' => 422 ) );
		} catch ( \Exception $e ) {
			return $this->error( $e ); }
	}
	public function create_listing( \WP_REST_Request $request ) {
		try {
			$body = $this->listing_body( $request->get_json_params() );
			return rest_ensure_response( $this->client->post( '/listings', $body, 'listing-' . wp_generate_uuid4(), 20 ) );
		} catch ( \Exception $e ) {
			return $this->error( $e ); } }
	public function listing_item( \WP_REST_Request $request ) {
		try {
			$path = '/listings/' . rawurlencode( (string) $request['id'] );
			if ( 'DELETE' === $request->get_method() ) {
				return rest_ensure_response( $this->client->put( $path, array( 'status' => 'archived' ) ) );
			} return rest_ensure_response( $this->client->put( $path, $this->listing_body( $request->get_json_params() ) ) );
		} catch ( \Exception $e ) {
			return $this->error( $e ); } }
	public function hub_posts( \WP_REST_Request $request ) {
		try {
			if ( 'GET' === $request->get_method() ) {
				$limit = $request->get_param( 'limit' );
				return rest_ensure_response( $this->client->get( '/jobs', array( 'limit' => min( 100, max( 1, absint( $limit ? $limit : 50 ) ) ) ) ) );
			} $input                = $request->get_json_params();
			$allowed                = array( 'action', 'idempotencyKey', 'title', 'description', 'linkUrl', 'hashtags', 'mediaUrls', 'mediaType', 'targets', 'market', 'metadata', 'scheduledAt', 'timezone' );
			$body                   = array_intersect_key( is_array( $input ) ? $input : array(), array_flip( $allowed ) );
			$body['clientSource']   = 'WordPress';
			$body['idempotencyKey'] = sanitize_text_field( $body['idempotencyKey'] ?? ( 'wp-' . wp_generate_uuid4() ) );
			return rest_ensure_response( $this->client->post( '/jobs', $body, $body['idempotencyKey'] ) );
		} catch ( \Exception $e ) {
			return $this->error( $e ); } }
	public function hub_connections() {
		try {
			return rest_ensure_response( $this->client->get( '/accounts', array(), 2 * MINUTE_IN_SECONDS ) );
		} catch ( \Exception $e ) {
			return $this->error( $e );}}
	public function hub_media() {
		try {
			return rest_ensure_response( $this->client->get( '/assets', array(), MINUTE_IN_SECONDS ) );
		} catch ( \Exception $e ) {
			return $this->error( $e );}}
	public function import_media( \WP_REST_Request $request ) {
		try {
			$attachment_id = absint( $request->get_param( 'attachmentId' ) );
			if ( ! $attachment_id || 'attachment' !== get_post_type( $attachment_id ) || ! current_user_can( 'edit_post', $attachment_id ) ) {
				return new \WP_Error( 'invalid_attachment', __( 'Select a media file you can access.', 'npati-content-automation' ), array( 'status' => 403 ) );
			}$url = wp_get_attachment_url( $attachment_id );
			$mime = get_post_mime_type( $attachment_id );
			if ( ! $url || ! preg_match( '#^(image/(jpeg|png|webp|gif)|video/(mp4|quicktime|webm))$#', (string) $mime ) ) {
				return new \WP_Error( 'unsupported_media', __( 'Choose a supported image or video.', 'npati-content-automation' ), array( 'status' => 422 ) );
			}$file = get_attached_file( $attachment_id );
			if ( $file && filesize( $file ) > 262144000 ) {
				return new \WP_Error( 'media_too_large', __( 'The selected file is too large.', 'npati-content-automation' ), array( 'status' => 413 ) );
			}return rest_ensure_response(
				$this->client->post(
					'/assets/import',
					array(
						'url'  => esc_url_raw( $url ),
						'name' => sanitize_file_name( get_the_title( $attachment_id ) . '.' . pathinfo( $file ? $file : $url, PATHINFO_EXTENSION ) ),
					),
					'media-' . wp_generate_uuid4(),
					45
				)
			);
		} catch ( \Exception $e ) {
			return $this->error( $e );}}
	public function import_listing_media( \WP_REST_Request $request ) {
		try {
			$attachment_id = absint( $request->get_param( 'attachmentId' ) );
			if ( ! $attachment_id || 'attachment' !== get_post_type( $attachment_id ) || ! current_user_can( 'edit_post', $attachment_id ) ) {
				return new \WP_Error( 'invalid_attachment', __( 'Select media you can access.', 'npati-content-automation' ), array( 'status' => 403 ) );
			}$url = wp_get_attachment_url( $attachment_id );
			$mime = get_post_mime_type( $attachment_id );
			$file = get_attached_file( $attachment_id );
			if ( ! $url || ! preg_match( '#^(image/(jpeg|png|gif|webp)|video/(mp4|quicktime|webm))$#', (string) $mime ) ) {
				return new \WP_Error( 'unsupported_media', __( 'Listings support JPG, PNG, GIF, WebP, MP4, MOV and WebM.', 'npati-content-automation' ), array( 'status' => 422 ) );
			}$limit = 0 === strpos( (string) $mime, 'video/' ) ? 2 * GB_IN_BYTES : 20 * MB_IN_BYTES;
			if ( $file && filesize( $file ) > $limit ) {
				return new \WP_Error( 'media_too_large', __( 'The selected media file is too large.', 'npati-content-automation' ), array( 'status' => 413 ) );
			}$result                        = $this->client->post(
				'/listings/media/import',
				array(
					'url'  => esc_url_raw( $url ),
					'name' => sanitize_file_name( wp_basename( $file ? $file : $url ) ),
				),
				'listing-media-' . wp_generate_uuid4(),
				300
			);
					$result['previewUrl']   = esc_url_raw( $url );
					$result['attachmentId'] = $attachment_id;
					return rest_ensure_response( $result );
		} catch ( \Exception $e ) {
			return $this->error( $e );}}
	public function hub_summary() {
		try {
			return rest_ensure_response( $this->client->get( '/dashboard/summary', array(), MINUTE_IN_SECONDS ) );
		} catch ( \Exception $e ) {
			return $this->error( $e );}}
	public function update_post( \WP_REST_Request $request ) {
		try {
			return rest_ensure_response( $this->client->patch( '/jobs/' . rawurlencode( (string) $request['id'] ), $this->job_body( $request->get_json_params() ) ) );
		} catch ( \Exception $e ) {
			return $this->error( $e );}}
	public function post_action( \WP_REST_Request $request ) {
		try {
			$route  = $request->get_route();
			$action = '/publish' === substr( $route, -8 ) ? 'publish' : 'schedule';
			return rest_ensure_response( $this->client->post( '/jobs/' . rawurlencode( (string) $request['id'] ) . '/' . $action, $this->job_body( $request->get_json_params() ), $action . '-' . wp_generate_uuid4() ) );
		} catch ( \Exception $e ) {
			return $this->error( $e );}}
	public function cancel_post( \WP_REST_Request $request ) {
		try {
			return rest_ensure_response( $this->client->delete( '/jobs/' . rawurlencode( (string) $request['id'] ) ) );
		} catch ( \Exception $e ) {
			return $this->error( $e );}}
	public function retry_post( \WP_REST_Request $request ) {
		try {
			return rest_ensure_response( $this->client->post( '/jobs/' . rawurlencode( (string) $request['id'] ) . '/retry', array(), 'retry-' . sanitize_text_field( (string) $request['id'] ) . '-' . wp_generate_uuid4() ) );
		} catch ( \Exception $e ) {
			return $this->error( $e );}}
	public function seo( \WP_REST_Request $request ) {
		return rest_ensure_response( ( new NativeSeoAnalyzer() )->analyze( absint( $request['id'] ) ) ); }
	private function job_body( $input ) {
		$allowed = array( 'action', 'title', 'description', 'linkUrl', 'hashtags', 'mediaUrls', 'mediaType', 'targets', 'market', 'metadata', 'scheduledAt', 'timezone' );
		return array_intersect_key( is_array( $input ) ? $input : array(), array_flip( $allowed ) );}
	private function listing_body( $input ) {
		$allowed = array( 'title', 'description', 'categoryId', 'price', 'discountPrice', 'isFree', 'isPost', 'currency', 'condition', 'brand', 'model', 'location', 'country', 'deliveryOptions', 'deliveryPrice', 'isFreeDelivery', 'isNegotiable', 'tags', 'enableColors', 'colors', 'photo1Color', 'photo2Color', 'photo3Color', 'photo4Color', 'photo5Color', 'photo6Color', 'enableSizes', 'sizes', 'size1', 'size2', 'size3', 'size4', 'size5', 'size6', 'sizeDetails1', 'sizeDetails2', 'sizeDetails3', 'sizeDetails4', 'sizeDetails5', 'sizeDetails6', 'phone', 'email', 'disableBuy', 'showAuthor', 'photos', 'video', 'thumbnail', 'shippingAddressId', 'shippingAvailable', 'pickupAvailable', 'packageSizePreset', 'packageLength', 'packageWidth', 'packageHeight', 'weight', 'weightUnit', 'dimensionUnit', 'scheduledFor', 'scheduleTimezone' );
		$body    = array_intersect_key( is_array( $input ) ? $input : array(), array_flip( $allowed ) );
		// Purchase and delivery are temporarily unavailable on npati.com.
		// Enforce the same restriction if a client tampers with the form.
		$body['disableBuy']        = true;
		$body['shippingAvailable'] = false;
		foreach ( array( 'deliveryOptions', 'deliveryPrice', 'isFreeDelivery', 'pickupAvailable', 'packageSizePreset', 'packageLength', 'packageWidth', 'packageHeight', 'weight', 'weightUnit', 'dimensionUnit' ) as $delivery_key ) {
			unset( $body[ $delivery_key ] );
		}
		foreach ( array( 'title', 'description', 'categoryId', 'currency', 'condition', 'brand', 'model', 'location', 'country', 'video', 'thumbnail', 'shippingAddressId', 'packageSizePreset', 'weightUnit', 'dimensionUnit', 'scheduledFor', 'scheduleTimezone', 'phone' ) as $key ) {
			if ( isset( $body[ $key ] ) && is_string( $body[ $key ] ) ) {
				$body[ $key ] = sanitize_textarea_field( $body[ $key ] );
			}
		}if ( isset( $body['email'] ) ) {
			$body['email'] = sanitize_email( $body['email'] );
		}return $body;}
	private function error( $e ) {
		$status = $e instanceof ApiException ? $e->status() : 500;
		$code   = $e instanceof ApiException ? $e->error_code() : 'internal_error';
		return new \WP_Error(
			$code,
			$e->getMessage(),
			array(
				'status'     => $status,
				'request_id' => $e instanceof ApiException ? $e->request_id() : '',
			)
		); }
}
