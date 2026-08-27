<?php
namespace NPATI\Hub\Seo;

defined( 'ABSPATH' ) || exit;

final class SeoManager {
	public function register() {
		add_action( 'add_meta_boxes', array( $this, 'box' ) );
		add_action( 'save_post', array( $this, 'save' ), 10, 2 );}
	public function provider() {
		$yoast = new YoastSeoAdapter();
		return $yoast->isAvailable() ? $yoast : new NativeSeoAnalyzer(); }
	public function box() {
		add_meta_box( 'npati-seo-check', __( 'NPATI SEO Check', 'npati-content-automation' ), array( $this, 'render' ), 'post', 'side', 'default' );}
	public function render( $post ) {
		wp_nonce_field( 'npati_seo_save', 'npati_seo_nonce' );
		$provider = $this->provider();
		$analysis = $provider->getAnalysis( $post->ID );
		$data     = $provider->getSeoData( $post->ID );
		echo '<p><strong>' . esc_html__( 'Score:', 'npati-content-automation' ) . ' ' . esc_html( $analysis['score'] ) . '/100</strong> · ' . esc_html( 'yoast' === $analysis['provider'] ? 'Yoast SEO' : 'NPATI' ) . '</p><p><label>' . esc_html__( 'Focus keyphrase', 'npati-content-automation' ) . '<input class="widefat" name="npati_focus_keyphrase" value="' . esc_attr( $data['focus_keyphrase'] ?? '' ) . '"></label></p><ul>';
		foreach ( array_slice( $analysis['recommendations'], 0, 5 ) as $item ) {
			echo '<li>' . esc_html( $item['message'] ) . '</li>';
		}echo '</ul><p class="description">' . esc_html__( 'SEO recommendations do not block publishing or guarantee rankings.', 'npati-content-automation' ) . '</p>';}
	public function save( $post_id, $post ) {
		if ( 'post' !== $post->post_type || ! isset( $_POST['npati_seo_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['npati_seo_nonce'] ) ), 'npati_seo_save' ) || ! current_user_can( 'edit_post', $post_id ) || wp_is_post_autosave( $post_id ) || wp_is_post_revision( $post_id ) ) {
			return;
		}$this->provider()->updateSeoData( $post_id, array( 'focus_keyphrase' => sanitize_text_field( wp_unslash( $_POST['npati_focus_keyphrase'] ?? '' ) ) ) );}
}
