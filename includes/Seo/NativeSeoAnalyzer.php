<?php
namespace NPATI\Hub\Seo;

defined( 'ABSPATH' ) || exit;

final class NativeSeoAnalyzer implements SeoProviderInterface {
	public function isAvailable() {
		return true;}
	public function getSeoData( $post_id ) {
		return array(
			'title'           => get_the_title( $post_id ),
			'description'     => get_post_meta( $post_id, '_npati_meta_description', true ),
			'focus_keyphrase' => get_post_meta( $post_id, '_npati_focus_keyphrase', true ),
			'canonical'       => get_post_meta( $post_id, '_npati_canonical', true ),
		);}
	public function updateSeoData( $post_id, array $data ) {
		foreach ( array(
			'description'     => '_npati_meta_description',
			'focus_keyphrase' => '_npati_focus_keyphrase',
			'canonical'       => '_npati_canonical',
		) as $key => $meta ) {
			if ( isset( $data[ $key ] ) ) {
				update_post_meta( $post_id, $meta, 'canonical' === $key ? esc_url_raw( $data[ $key ], array( 'http', 'https' ) ) : sanitize_text_field( $data[ $key ] ) );
			}
		}}
	public function getAnalysis( $post_id ) {
		return $this->analyze( $post_id );}
	public function analyze( $post_id ) {
		$post = get_post( $post_id );
		if ( ! $post ) {
			return array(
				'score'           => 0,
				'recommendations' => array(
					array(
						'code'    => 'POST_NOT_FOUND',
						'level'   => 'error',
						'message' => 'Post not found.',
						'field'   => 'post',
					),
				),
			);
		}$data           = $this->getSeoData( $post_id );
		$text            = wp_strip_all_tags( strip_shortcodes( $post->post_content ) );
		$words           = str_word_count( $text );
		$recommendations = array();$checks = array(
			array( 'SEO_TITLE_MISSING', ! trim( $data['title'] ), 'error', 'Add an SEO title.', 'title' ),
			array( 'SEO_TITLE_TOO_LONG', strlen( $data['title'] ) > 60, 'warning', 'Keep the title near 60 characters or less.', 'title' ),
			array( 'META_DESCRIPTION_MISSING', ! trim( $data['description'] ), 'error', 'Add a meta description.', 'meta_description' ),
			array( 'META_DESCRIPTION_TOO_LONG', strlen( $data['description'] ) > 160, 'warning', 'Keep the meta description near 160 characters or less.', 'meta_description' ),
			array( 'CONTENT_TOO_SHORT', $words < 300, 'warning', 'Consider adding more useful content.', 'content' ),
			array( 'NO_INTERNAL_LINKS', ! preg_match( '#href=["\']' . preg_quote( home_url( '/' ), '#' ) . '#i', $post->post_content ), 'warning', 'Consider adding a relevant internal link.', 'content' ),
			array( 'NO_IMAGE_ALT', preg_match( '/<img\b/i', $post->post_content ) && preg_match( '/<img\b(?![^>]*\balt=["\'][^"\']+["\'])/i', $post->post_content ), 'warning', 'Add descriptive alternative text to images.', 'content' ),
			array( 'MULTIPLE_H1', preg_match_all( '/<h1\b/i', $post->post_content ) > 1, 'warning', 'Use only one main H1 heading.', 'content' ),
		);
		$keyphrase = trim( $data['focus_keyphrase'] );
		if ( $keyphrase ) {
			$checks[] = array( 'KEYPHRASE_MISSING_TITLE', false === stripos( $data['title'], $keyphrase ), 'warning', 'Use the focus keyphrase naturally in the title.', 'title' );
			$checks[] = array( 'KEYPHRASE_MISSING_INTRO', false === stripos( substr( $text, 0, 500 ), $keyphrase ), 'warning', 'Consider using the focus keyphrase naturally in the introduction.', 'content' );}
		foreach ( $checks as $check ) {
			if ( $check[1] ) {
				$recommendations[] = array(
					'code'    => $check[0],
					'level'   => $check[2],
					'message' => $check[3],
					'field'   => $check[4],
				);
			}
		}$score = max(
			0,
			100 - count(
				array_filter(
					$recommendations,
					static function ( $r ) {
						return 'error' === $r['level'];
					}
				)
			) * 15 - count(
				array_filter(
					$recommendations,
					static function ( $r ) {
						return 'warning' === $r['level'];
					}
				)
			) * 7
		);
		return array(
			'score'           => $score,
			'provider'        => 'npati',
			'recommendations' => $recommendations,
			'disclaimer'      => 'Recommendations do not guarantee search rankings.',
		);}
}
