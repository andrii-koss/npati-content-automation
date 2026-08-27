<?php
namespace NPATI\Hub\Seo;

defined( 'ABSPATH' ) || exit;

interface SeoProviderInterface {
	public function isAvailable();
	public function getSeoData( $post_id );
	public function updateSeoData( $post_id, array $data );
	public function getAnalysis( $post_id );
}
