<?php
namespace NPATI\Hub\Gutenberg;

use NPATI\Hub\Api\Client;
use NPATI\Hub\Core\Settings;

defined( 'ABSPATH' ) || exit;

final class Integration {
	private $settings;
	private $client;
	public function __construct( Settings $settings, Client $client ) {
		$this->settings = $settings;
		$this->client   = $client;}
	public function register() {
		add_action( 'init', array( $this, 'blocks' ) );
		add_shortcode( 'npati_store_link', array( $this, 'store_shortcode' ) );
		add_shortcode( 'npati_listings', array( $this, 'listings_shortcode' ) );
		add_action( 'wp_footer', array( $this, 'footer' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'editor_assets' ) );}
	public function blocks() {
		register_block_type(
			'npati/store-link',
			array(
				'api_version'     => 2,
				'attributes'      => array(
					'text'   => array(
						'type'    => 'string',
						'default' => 'View my store on NPATI',
					),
					'newTab' => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'style'  => array(
						'type'    => 'string',
						'default' => 'link',
					),
				),
				'render_callback' => array( $this, 'store_block' ),
			)
		);
		register_block_type(
			'npati/listings',
			array(
				'api_version'     => 2,
				'attributes'      => array(
					'mode'     => array(
						'type'    => 'string',
						'default' => 'latest',
					),
					'limit'    => array(
						'type'    => 'number',
						'default' => 6,
					),
					'category' => array(
						'type'    => 'string',
						'default' => '',
					),
				),
				'render_callback' => array( $this, 'listings_block' ),
			)
		);
	}
	public function editor_assets() {
		wp_enqueue_script( 'npati-hub-blocks', NPATI_HUB_URL . 'assets/js/blocks.js', array( 'wp-blocks', 'wp-element', 'wp-components', 'wp-block-editor', 'wp-i18n' ), NPATI_HUB_VERSION, true );}
	public function footer() {
		if ( ! $this->settings->get( 'store_link_enabled', false ) ) {
			return;
		}echo '<div class="npati-store-footer">' . wp_kses_post( $this->render_store( array() ) ) . '</div>';}
	public function store_shortcode( $atts ) {
		return $this->render_store(
			shortcode_atts(
				array(
					'text'    => $this->settings->get( 'store_link_text' ),
					'new_tab' => $this->settings->get( 'store_link_new_tab' ) ? '1' : '0',
					'style'   => 'link',
				),
				$atts,
				'npati_store_link'
			)
		);}
	public function store_block( $atts ) {
		return $this->render_store(
			array(
				'text'    => $atts['text'] ?? '',
				'new_tab' => ! empty( $atts['newTab'] ) ? '1' : '0',
				'style'   => $atts['style'] ?? 'link',
			)
		);}
	private function render_store( $atts ) {
		$url = $this->settings->get( 'store_url', '' );
		if ( ! $url ) {
			return '';
		}wp_enqueue_style( 'npati-hub-frontend', NPATI_HUB_URL . 'assets/css/frontend.css', array(), NPATI_HUB_VERSION );
		$text  = sanitize_text_field( $atts['text'] ?? $this->settings->get( 'store_link_text' ) );
		$new   = ! empty( $atts['new_tab'] );
		$class = 'button' === ( $atts['style'] ?? '' ) ? 'npati-store-link npati-store-button' : 'npati-store-link';
		return '<a class="' . esc_attr( $class ) . '" href="' . esc_url( $url ) . '"' . ( $new ? ' target="_blank" rel="noopener noreferrer"' : '' ) . '>' . esc_html( $text ) . '</a>';}
	public function listings_shortcode( $atts ) {
		$atts = shortcode_atts(
			array(
				'limit'    => 6,
				'category' => '',
				'mode'     => 'latest',
			),
			$atts,
			'npati_listings'
		);
		return $this->render_listings( $atts );}
	public function listings_block( $atts ) {
		return $this->render_listings( $atts );}
	private function render_listings( $atts ) {
		$limit    = min( 24, max( 1, absint( $atts['limit'] ?? 6 ) ) );
		$category = sanitize_title( $atts['category'] ?? '' );
		wp_enqueue_style( 'npati-hub-frontend', NPATI_HUB_URL . 'assets/css/frontend.css', array(), NPATI_HUB_VERSION );
		try {
			$items = $this->client->get(
				'/listings',
				array(
					'country' => $this->settings->get( 'market', 'US' ),
					'status'  => 'active',
				),
				10 * MINUTE_IN_SECONDS
			);
		} catch ( \Exception $e ) {
			$items = get_transient( 'npati_hub_public_listings_fallback' );
			if ( false === $items ) {
				return '';
			}
		}
		if ( isset( $items['items'] ) ) {
			$items = $items['items'];
		}if ( ! is_array( $items ) ) {
			return '';
		}if ( $category ) {
			$items = array_filter(
				$items,
				static function ( $item ) use ( $category ) {
					return sanitize_title( $item['categorySlug'] ?? '' ) === $category;
				}
			);
		}$items = array_slice( array_values( $items ), 0, $limit );
		if ( ! $items ) {
			return '';
		}
		set_transient( 'npati_hub_public_listings_fallback', $items, DAY_IN_SECONDS );
		$html = '<div class="npati-listings-grid">';
		foreach ( $items as $item ) {
			$url    = esc_url( $item['linkUrl'] ?? '' );
			$image  = '';
			$photos = is_array( $item['photos'] ?? null ) ? $item['photos'] : array();
			if ( ! empty( $item['thumbnail'] ) ) {
				$image = $item['thumbnail'];
			} elseif ( $photos ) {
				$image = $photos[0];
			}$html .= '<article class="npati-listing">' . ( $image ? '<img loading="lazy" src="' . esc_url( $image ) . '" alt="' . esc_attr( $item['title'] ?? '' ) . '">' : '' ) . '<h3>' . esc_html( $item['title'] ?? '' ) . '</h3><p>' . esc_html( wp_trim_words( wp_strip_all_tags( $item['description'] ?? '' ), 18 ) ) . '</p>' . ( $url ? '<a href="' . $url . '" rel="noopener noreferrer">' . esc_html__( 'View on NPATI', 'npati-content-automation' ) . '</a>' : '' ) . '</article>';
		}$html .= '</div>';
		return $html;}
}
