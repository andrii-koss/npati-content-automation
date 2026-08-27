<?php
namespace NPATI\Hub\Core;

defined( 'ABSPATH' ) || exit;

final class Settings {
	const OPTION = 'npati_hub_settings';

	public function defaults() {
		return array(
			'market'                    => 'US',
			'store_link_enabled'        => false,
			'store_link_text'           => 'View my store on NPATI',
			'store_link_new_tab'        => true,
			'store_url'                 => '',
			'security_mode'             => 'standard',
			'default_author'            => 0,
			'allow_remote_publish'      => false,
			'allow_remote_tag_creation' => false,
			'audit_retention_days'      => 30,
			'delete_on_uninstall'       => false,
		);
	}

	public function all() {
		$value = get_option( self::OPTION, array() );
		return wp_parse_args( is_array( $value ) ? $value : array(), $this->defaults() );
	}

	public function get( $key, $default = null ) {
		$values = $this->all();
		return array_key_exists( $key, $values ) ? $values[ $key ] : $default;
	}

	public function update( array $input ) {
		$current = $this->all();
		// The market is controlled only by the connected NPATI profile.
		// Admin form submissions must never override it.
		$market = strtoupper( (string) $current['market'] );
		$clean  = array(
			'market'                    => in_array( $market, array( 'US', 'UA', 'CA', 'GB' ), true ) ? $market : 'US',
			'store_link_enabled'        => ! empty( $input['store_link_enabled'] ),
			'store_link_text'           => sanitize_text_field( (string) ( $input['store_link_text'] ?? $current['store_link_text'] ) ),
			'store_link_new_tab'        => ! empty( $input['store_link_new_tab'] ),
			'store_url'                 => esc_url_raw( (string) ( $input['store_url'] ?? $current['store_url'] ), array( 'https' ) ),
			'security_mode'             => 'high' === ( $input['security_mode'] ?? $current['security_mode'] ) ? 'high' : 'standard',
			'default_author'            => absint( $input['default_author'] ?? $current['default_author'] ),
			'allow_remote_publish'      => ! empty( $input['allow_remote_publish'] ),
			'allow_remote_tag_creation' => ! empty( $input['allow_remote_tag_creation'] ),
			'audit_retention_days'      => in_array( absint( $input['audit_retention_days'] ?? 30 ), array( 7, 30, 90 ), true ) ? absint( $input['audit_retention_days'] ) : 30,
			'delete_on_uninstall'       => ! empty( $input['delete_on_uninstall'] ),
		);
		update_option( self::OPTION, $clean, false );
		return $clean;
	}

	public function set( $key, $value ) {
		$values                         = $this->all();
		$values[ sanitize_key( $key ) ] = $value;
		update_option( self::OPTION, $values, false );
	}

	public function api_base() {
		$base = defined( 'NPATI_HUB_API_URL' ) ? NPATI_HUB_API_URL : 'https://www.npati.com/hub/api/v1';
		$base = apply_filters( 'npati_hub/api_base_url', $base );
		return untrailingslashit( esc_url_raw( $base, array( 'https', 'http' ) ) );
	}

	public static function market_path( $market ) {
		$paths = array(
			'US' => '',
			'UA' => '/ua',
			'CA' => '/ca',
			'GB' => '/gb',
		);
		return $paths[ strtoupper( (string) $market ) ] ?? '';
	}
}
