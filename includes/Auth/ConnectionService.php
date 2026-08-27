<?php
namespace NPATI\Hub\Auth;

use NPATI\Hub\Api\Client;
use NPATI\Hub\Core\Settings;
use NPATI\Hub\Database\AuditLog;

defined( 'ABSPATH' ) || exit;

final class ConnectionService {
	private $settings;
	private $client;
	private $audit;
	public function __construct( Settings $settings, Client $client, AuditLog $audit ) {
		$this->settings = $settings;
		$this->client   = $client;
		$this->audit    = $audit; }

	public function status() {
		if ( (string) get_option( 'npati_hub_db_version', '' ) !== (string) NPATI_HUB_DB_VERSION ) {
			return array(
				'connected' => false,
				'status'    => 'disconnected',
			);
		}
		global $wpdb;
		$table = $wpdb->prefix . 'npati_connections';
		$row   = $wpdb->get_row( $wpdb->prepare( 'SELECT connection_id, site_id, market, username, permissions, status, created_at, last_seen_at, hub_public_key FROM %i ORDER BY id DESC LIMIT 1', $table ), ARRAY_A );
		if ( ! $row ) {
			return array(
				'connected' => false,
				'status'    => 'disconnected',
			); }
		$row['connected']               = 'connected' === $row['status'];
		$permissions                    = json_decode( $row['permissions'] ? $row['permissions'] : '[]', true );
		$row['permissions']             = $permissions ? $permissions : array();
		$public_key                     = base64_decode( (string) ( $row['hub_public_key'] ?? '' ), true );
		$row['signing_key_fingerprint'] = false !== $public_key && 32 === strlen( $public_key ) ? substr( hash( 'sha256', $public_key ), 0, 16 ) : null;
		unset( $row['hub_public_key'] );
		return $row;
	}

	public function begin( $intent = 'login' ) {
		$state    = wp_generate_password( 48, false, false );
		$verifier = wp_generate_password( 64, false, false );
		$payload  = array(
			'site_url'              => home_url( '/' ),
			'site_name'             => get_bloginfo( 'name' ),
			'market'                => $this->settings->get( 'market', 'US' ),
			'callback_url'          => admin_url( 'admin.php?page=npati&npati_pairing=complete' ),
			'state'                 => hash( 'sha256', $state ),
			'code_challenge'        => $this->base64url( hash( 'sha256', $verifier, true ) ),
			'code_challenge_method' => 'S256',
			'site_fingerprint'      => hash( 'sha256', network_site_url( '/' ) . '|' . get_current_blog_id() ),
			'plugin_version'        => NPATI_HUB_VERSION,
			'wordpress_version'     => get_bloginfo( 'version' ),
			'php_version'           => PHP_VERSION,
		);
		$data     = $this->client->post( '/wordpress/pairings', $payload, 'pairing-' . hash( 'sha256', $state ) );
		if ( empty( $data['pairing_id'] ) || empty( $data['authorization_url'] ) ) {
			throw new \RuntimeException( esc_html__( 'NPATI did not return a pairing request.', 'npati-content-automation' ) ); }
		set_transient(
			'npati_hub_pairing_' . get_current_user_id(),
			array(
				'state'      => $state,
				'verifier'   => $verifier,
				'pairing_id' => sanitize_text_field( $data['pairing_id'] ),
				'poll_token' => sanitize_text_field( $data['poll_token'] ?? '' ),
			),
			15 * MINUTE_IN_SECONDS
		);
		$this->audit->record( 'connection_pairing_started', 'success', array( 'pairing_id' => $data['pairing_id'] ) );
		$url = esc_url_raw( $data['authorization_url'], array( 'https', 'http' ) );
		return array(
			'authorization_url'  => $url,
			'pairing_id'         => sanitize_text_field( $data['pairing_id'] ),
			'registration_token' => sanitize_text_field( $data['poll_token'] ?? '' ),
			'registration_url'   => esc_url_raw( $data['registration_url'] ?? '', array( 'https', 'http' ) ),
			'intent'             => 'register' === $intent ? 'register' : 'login',
		);
	}

	public function complete() {
		global $wpdb;
		$table   = $wpdb->prefix . 'npati_connections';
		$pending = get_transient( 'npati_hub_pairing_' . get_current_user_id() );
		if ( ! is_array( $pending ) ) {
			return new \WP_Error( 'pairing_expired', __( 'The NPATI pairing request expired. Start again.', 'npati-content-automation' ) ); }
		try {
			$data = $this->client->post(
				'/wordpress/pairings/exchange',
				array(
					'pairing_id'    => $pending['pairing_id'],
					'poll_token'    => $pending['poll_token'],
					'code_verifier' => $pending['verifier'],
				)
			);
		} catch ( \Exception $exception ) {
			return new \WP_Error( 'pairing_failed', $exception->getMessage() ); }
		$required = array( 'connection_id', 'site_id', 'credential', 'hub_public_key' );
		foreach ( $required as $key ) {
			if ( empty( $data[ $key ] ) ) {
				return new \WP_Error( 'invalid_pairing', __( 'NPATI returned incomplete connection data.', 'npati-content-automation' ) ); }
		}
		$wpdb->query( $wpdb->prepare( 'UPDATE %i SET status = %s', $table, 'disconnected' ) );
		$wpdb->replace(
			$table,
			array(
				'connection_id'  => sanitize_text_field( $data['connection_id'] ),
				'site_id'        => sanitize_text_field( $data['site_id'] ),
				'market'         => in_array( strtoupper( $data['market'] ?? '' ), array( 'US', 'UA', 'CA', 'GB' ), true ) ? strtoupper( $data['market'] ) : $this->settings->get( 'market', 'US' ),
				'username'       => sanitize_user( $data['username'] ?? '' ),
				'credential'     => sanitize_text_field( $data['credential'] ),
				'hub_public_key' => sanitize_textarea_field( $data['hub_public_key'] ),
				'permissions'    => wp_json_encode( array_map( 'sanitize_key', $data['permissions'] ?? array() ) ),
				'status'         => 'connected',
				'created_at'     => current_time( 'mysql', true ),
				'last_seen_at'   => current_time( 'mysql', true ),
			),
			array( '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s' )
		);
		delete_transient( 'npati_hub_pairing_' . get_current_user_id() );
		delete_transient( 'npati_hub_profile' );
		$this->settings->set( 'market', in_array( strtoupper( $data['market'] ?? '' ), array( 'US', 'UA', 'CA', 'GB' ), true ) ? strtoupper( $data['market'] ) : $this->settings->get( 'market', 'US' ) );
		if ( ! empty( $data['store_url'] ) ) {
			$this->settings->set( 'store_url', esc_url_raw( $data['store_url'], array( 'https' ) ) ); }
		$this->audit->record( 'connection_connected', 'success', array( 'connection_id' => $data['connection_id'] ) );
		do_action( 'npati_hub/connection/connected', sanitize_text_field( $data['connection_id'] ) );
		return $this->status();
	}

	public function disconnect() {
		global $wpdb;
		$status = $this->status();
		$table  = $wpdb->prefix . 'npati_connections';
		if ( ! empty( $status['connected'] ) ) {
			try {
				$this->client->post( '/wordpress/connections/' . rawurlencode( $status['connection_id'] ) . '/disconnect', array(), 'disconnect-' . wp_generate_uuid4() ); } catch ( \Exception $ignored ) {
				}
		}
		$wpdb->query( $wpdb->prepare( 'UPDATE %i SET credential = %s, status = %s', $table, '', 'disconnected' ) );
		delete_transient( 'npati_hub_profile' );
		$this->audit->record( 'connection_disconnected', 'success' );
		return array(
			'connected' => false,
			'status'    => 'disconnected',
		);
	}

	private function base64url( $value ) {
		return rtrim( strtr( base64_encode( $value ), '+/', '-_' ), '=' ); }
}
