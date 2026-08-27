<?php
namespace NPATI\Hub\Seo;

defined( 'ABSPATH' ) || exit;

final class YoastSeoAdapter implements SeoProviderInterface {
	public function isAvailable() {
		return defined( 'WPSEO_VERSION' );}
	public function getSeoData( $post_id ) {
		return array(
			'title'           => get_post_meta( $post_id, '_yoast_wpseo_title', true ),
			'description'     => get_post_meta( $post_id, '_yoast_wpseo_metadesc', true ),
			'focus_keyphrase' => get_post_meta( $post_id, '_yoast_wpseo_focuskw', true ),
			'canonical'       => get_post_meta( $post_id, '_yoast_wpseo_canonical', true ),
		);}
	public function updateSeoData( $post_id, array $data ) {
		$map = array(
			'title'           => '_yoast_wpseo_title',
			'description'     => '_yoast_wpseo_metadesc',
			'focus_keyphrase' => '_yoast_wpseo_focuskw',
			'canonical'       => '_yoast_wpseo_canonical',
		);
		foreach ( $map as $key => $meta ) {
			if ( isset( $data[ $key ] ) ) {
				update_post_meta( $post_id, $meta, 'canonical' === $key ? esc_url_raw( $data[ $key ], array( 'http', 'https' ) ) : sanitize_text_field( $data[ $key ] ) );
			}
		}}
	public function getAnalysis( $post_id ) {
		$native               = new NativeSeoAnalyzer();
		$result               = $native->analyze( $post_id );
		$result['provider']   = 'yoast';
		$result['yoast_data'] = $this->getSeoData( $post_id );
		return $result;}
}
