<?php
namespace NPATI\Hub\Content;

defined( 'ABSPATH' ) || exit;

final class ContentService {
	private $providers;
	public function __construct( ProviderRegistry $providers ) {
		$this->providers = $providers; }

	public function generate_article( array $task ) {
		if ( function_exists( 'set_time_limit' ) ) {
			@set_time_limit( 240 ); } // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged -- hosts may disable runtime changes.
		$generated = $this->providers->active()->generate_article( $task );
		$title     = sanitize_text_field( (string) ( $generated['seo_title'] ?? $task['title'] ?? '' ) );
		$content   = wp_kses_post( (string) ( $generated['article_html'] ?? '' ) );
		if ( ! $title || ! $content ) {
			throw new \RuntimeException( esc_html__( 'Generated article is empty.', 'npati-content-automation' ) ); }
		$args     = array(
			'post_type'    => 'post',
			'post_status'  => 'publish',
			'post_title'   => $title,
			'post_content' => $content,
			'post_excerpt' => sanitize_textarea_field( (string) ( $generated['excerpt'] ?? '' ) ),
			'post_author'  => $this->author(),
		);
		$category = sanitize_text_field( (string) ( $task['category'] ?? '' ) );
		if ( $category ) {
			$term = get_term_by( 'name', $category, 'category' );
			if ( ! $term ) {
				$term = get_term_by( 'slug', sanitize_title( $category ), 'category' ); }
			if ( ! $term ) {
				$created = wp_insert_term( $category, 'category' );
				if ( ! is_wp_error( $created ) ) {
					$term = get_term( (int) $created['term_id'], 'category' ); } elseif ( 'term_exists' === $created->get_error_code() ) {
					$term = get_term( (int) $created->get_error_data(), 'category' ); }
			}
			if ( $term && ! is_wp_error( $term ) ) {
				$args['post_category'] = array( (int) $term->term_id ); }
		}
		$post_id = wp_insert_post( $args, true );
		if ( is_wp_error( $post_id ) ) {
			throw new \RuntimeException( esc_html( $post_id->get_error_message() ) ); }
		$attachment_id = absint( $task['image_attachment_id'] ?? 0 );
		if ( $attachment_id && 'attachment' === get_post_type( $attachment_id ) && wp_attachment_is_image( $attachment_id ) ) {
			set_post_thumbnail( $post_id, $attachment_id ); }
		$keywords = array_values( array_filter( array_map( 'sanitize_text_field', (array) ( $task['keywords'] ?? array() ) ) ) );
		update_post_meta( $post_id, '_npati_content_task_id', sanitize_text_field( (string) ( $task['id'] ?? '' ) ) );
		update_post_meta( $post_id, '_npati_ai_provider', $this->providers->active()->id() );
		update_post_meta( $post_id, '_yoast_wpseo_title', sanitize_text_field( (string) ( $generated['meta_title'] ?? $title ) ) );
		update_post_meta( $post_id, '_yoast_wpseo_metadesc', sanitize_text_field( (string) ( $generated['meta_description'] ?? '' ) ) );
		update_post_meta( $post_id, '_npati_meta_title', sanitize_text_field( (string) ( $generated['meta_title'] ?? $title ) ) );
		update_post_meta( $post_id, '_npati_meta_description', sanitize_text_field( (string) ( $generated['meta_description'] ?? '' ) ) );
		if ( $keywords ) {
			update_post_meta( $post_id, '_yoast_wpseo_focuskw', $keywords[0] );
			update_post_meta( $post_id, '_npati_seo_keywords', $keywords ); }
		return array(
			'post_id'  => $post_id,
			'status'   => get_post_status( $post_id ),
			'title'    => get_the_title( $post_id ),
			'url'      => get_permalink( $post_id ),
			'edit_url' => get_edit_post_link( $post_id, 'raw' ),
		);
	}

	public function generate_social_post( $post_id ) {
		$post = get_post( absint( $post_id ) );
		if ( ! $post || 'post' !== $post->post_type || ! current_user_can( 'edit_post', $post->ID ) ) {
			throw new \RuntimeException( esc_html__( 'Article not found or unavailable.', 'npati-content-automation' ) ); }
		$result = $this->providers->active()->generate_social_post(
			array(
				'title'   => $post->post_title,
				'content' => $post->post_content,
				'url'     => get_permalink( $post ),
			)
		);
		return array(
			'text'   => sanitize_textarea_field( (string) ( $result['text'] ?? '' ) ),
			'title'  => $post->post_title,
			'url'    => get_permalink( $post ),
			'postId' => $post->ID,
		);
	}

	private function author() {
		$user = get_current_user_id();
		if ( $user && user_can( $user, 'publish_posts' ) ) {
			return $user;
		} $users = get_users(
			array(
				'role__in' => array( 'administrator', 'editor', 'author' ),
				'number'   => 1,
				'fields'   => 'ids',
			)
		);
		return $users ? absint( $users[0] ) : 0; }
}
