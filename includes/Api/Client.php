<?php
namespace NPATI\Hub\Api;

use NPATI\Hub\Core\Settings;
use NPATI\Hub\Database\AuditLog;

defined( 'ABSPATH' ) || exit;

final class Client {
	private $settings;
	private $audit;
	public function __construct( Settings $settings, AuditLog $audit ) {
		$this->settings = $settings;
		$this->audit    = $audit; }
	public function get( $path, array $query = array(), $cache_ttl = 0 ) {
		return $this->request( 'GET', $path, array(), $query, '', $cache_ttl ); }
	public function post( $path, array $body = array(), $idempotency_key = '', $timeout = 8 ) {
		return $this->request( 'POST', $path, $body, array(), $idempotency_key, 0, $timeout ); }
	public function patch( $path, array $body = array(), $idempotency_key = '' ) {
		return $this->request( 'PATCH', $path, $body, array(), $idempotency_key ); }
	public function put( $path, array $body = array(), $idempotency_key = '' ) {
		return $this->request( 'PUT', $path, $body, array(), $idempotency_key ); }
	public function delete( $path, array $body = array() ) {
		return $this->request( 'DELETE', $path, $body ); }

	public function request( $method, $path, array $body = array(), array $query = array(), $idempotency_key = '', $cache_ttl = 0, $timeout = 8 ) {
		$is_pairing_request = 0 === strpos( '/' . ltrim( (string) $path, '/' ), '/wordpress/pairings' );
		if ( ! $is_pairing_request && get_transient( 'npati_hub_circuit_open' ) ) {
			throw new ApiException( esc_html__( 'NPATI is temporarily unavailable.', 'npati-content-automation' ), 'CIRCUIT_OPEN', 503 ); }
		$url       = $this->url( $path, $query );
		$cache_key = 'npati_hub_' . md5( $url . get_current_blog_id() );
		if ( 'GET' === $method && $cache_ttl ) {
			$cached = get_transient( $cache_key );
			if ( false !== $cached ) {
				return $cached; }
		}
		$request_id = wp_generate_uuid4();
		$headers    = array(
			'Accept'                 => 'application/json',
			'Content-Type'           => 'application/json',
			'X-NPATI-Request-ID'     => $request_id,
			'X-NPATI-Plugin-Version' => NPATI_HUB_VERSION,
		);
		$credential = $this->credential();
		if ( $credential ) {
			$headers['X-API-Key'] = $credential; }
		if ( $idempotency_key ) {
			$headers['Idempotency-Key'] = sanitize_text_field( $idempotency_key ); }
		$args = array(
			'method'              => $method,
			'timeout'             => min( 600, max( 3, absint( $timeout ) ) ),
			'redirection'         => 2,
			'sslverify'           => true,
			'limit_response_size' => 2 * MB_IN_BYTES,
			'headers'             => $headers,
		);
		if ( 'GET' !== $method ) {
			$args['body'] = wp_json_encode( $body ); }
		$response = wp_remote_request( $url, $args );
		if ( is_wp_error( $response ) ) {
			if ( ! $is_pairing_request ) {
				$this->failed( $request_id, $response->get_error_code() );
			} throw new ApiException( esc_html__( 'NPATI is temporarily unavailable. Your WordPress content is safe.', 'npati-content-automation' ), 'NETWORK_ERROR', 503, esc_html( $request_id ) ); }
		$status  = wp_remote_retrieve_response_code( $response );
		$payload = json_decode( wp_remote_retrieve_body( $response ), true );
		if ( ! is_array( $payload ) ) {
			if ( ! $is_pairing_request ) {
				$this->failed( $request_id, 'INVALID_JSON' );
			} throw new ApiException( esc_html__( 'NPATI returned an invalid response.', 'npati-content-automation' ), 'INVALID_RESPONSE', 502, esc_html( $request_id ) ); }
		if ( $status < 200 || $status >= 300 ) {
			$error = $payload['error'] ?? array();
			$code  = sanitize_key( $error['code'] ?? 'API_ERROR' );
			if ( 401 === $status && 'invalid_api_key' === $code ) {
				$this->invalidate_connection( $request_id );
			} elseif ( ! $is_pairing_request ) {
				$this->failed( $request_id, $code );
			}
			$message = 429 === $status ? __( 'Publishing limit reached. Try again later.', 'npati-content-automation' ) : sanitize_text_field( $error['message'] ?? __( 'NPATI request failed.', 'npati-content-automation' ) );
			throw new ApiException( esc_html( $message ), esc_html( $code ), esc_html( (string) $status ), esc_html( sanitize_text_field( $error['request_id'] ?? $request_id ) ) );
		}
		delete_transient( 'npati_hub_failures' );
		delete_transient( 'npati_hub_circuit_open' );
		$data = array_key_exists( 'data', $payload ) ? $payload['data'] : $payload;
		if ( 'GET' === $method && $cache_ttl ) {
			set_transient( $cache_key, $data, min( HOUR_IN_SECONDS, absint( $cache_ttl ) ) ); }
		return $data;
	}

	private function url( $path, array $query ) {
		$base    = $this->settings->api_base();
		$parts   = wp_parse_url( $base );
		$allowed = array( 'www.npati.com', 'api.npati.com', 'localhost', '127.0.0.1' );
		if ( ! in_array( strtolower( $parts['host'] ?? '' ), $allowed, true ) ) {
			throw new ApiException( esc_html__( 'The NPATI API host is not allowed.', 'npati-content-automation' ), 'SSRF_BLOCKED', 400 ); }
		if ( 'https' !== ( $parts['scheme'] ?? '' ) && ! in_array( $parts['host'] ?? '', array( 'localhost', '127.0.0.1' ), true ) ) {
			throw new ApiException( esc_html__( 'NPATI API requires HTTPS.', 'npati-content-automation' ), 'HTTPS_REQUIRED', 400 ); }
		$path = '/' . ltrim( preg_replace( '#[^A-Za-z0-9_./-]#', '', (string) $path ), '/' );
		$url  = $base . $path;
		return $query ? add_query_arg( array_map( 'sanitize_text_field', $query ), $url ) : $url;
	}

	private function credential() {
		global $wpdb;
		$table = $wpdb->prefix . 'npati_connections';
		$value = $wpdb->get_var( $wpdb->prepare( 'SELECT credential FROM %i WHERE status = %s ORDER BY id DESC LIMIT 1', $table, 'connected' ) );
		return is_string( $value ) ? $value : ''; }
	private function invalidate_connection( $request_id ) {
		global $wpdb;
		$table = $wpdb->prefix . 'npati_connections';
		$wpdb->query( $wpdb->prepare( "UPDATE %i SET credential = %s, status='disconnected' WHERE status='connected'", $table, '' ) );
		delete_transient( 'npati_hub_profile' );
		delete_transient( 'npati_hub_failures' );
		delete_transient( 'npati_hub_circuit_open' );
		$this->audit->record( 'connection_credential_expired', 'failed', array( 'reauthorization_required' => true ), $request_id, 'invalid_api_key' );
	}
	private function failed( $request_id, $code ) {
		$count = (int) get_transient( 'npati_hub_failures' ) + 1;
		set_transient( 'npati_hub_failures', $count, 10 * MINUTE_IN_SECONDS );
		if ( $count >= 5 ) {
			set_transient( 'npati_hub_circuit_open', 1, 5 * MINUTE_IN_SECONDS );
		} $this->audit->record( 'api_request', 'failed', array(), $request_id, $code ); }
}
