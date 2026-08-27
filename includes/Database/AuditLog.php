<?php
namespace NPATI\Hub\Database;

use NPATI\Hub\Core\Settings;

defined( 'ABSPATH' ) || exit;

final class AuditLog {
	private $settings;
	public function __construct( Settings $settings ) {
		$this->settings = $settings; }

	public function record( $event, $status, array $context = array(), $request_id = '', $error_code = '' ) {
		global $wpdb;
		$blocked = array( 'authorization', 'token', 'access_token', 'refresh_token', 'credential', 'secret', 'password', 'signature' );
		$clean   = array();
		foreach ( $context as $key => $value ) {
			if ( in_array( strtolower( (string) $key ), $blocked, true ) ) {
				continue; }
			$clean[ sanitize_key( $key ) ] = is_scalar( $value ) ? sanitize_text_field( (string) $value ) : '[redacted complex value]';
		}
		$wpdb->insert(
			$wpdb->prefix . 'npati_audit_log',
			array(
				'created_at' => current_time( 'mysql', true ),
				'request_id' => sanitize_text_field( $request_id ),
				'event'      => sanitize_key( $event ),
				'status'     => sanitize_key( $status ),
				'user_id'    => get_current_user_id() ? get_current_user_id() : null,
				'site_id'    => $this->site_id(),
				'error_code' => sanitize_key( $error_code ),
				'context'    => wp_json_encode( $clean ),
			),
			array( '%s', '%s', '%s', '%s', '%d', '%s', '%s', '%s' )
		);
	}

	public function recent( $limit = 50 ) {
		global $wpdb;
		$limit = min( 100, max( 1, absint( $limit ) ) );
		$table = $wpdb->prefix . 'npati_audit_log';
		return $wpdb->get_results( $wpdb->prepare( 'SELECT created_at, request_id, event, status, error_code, context FROM %i ORDER BY id DESC LIMIT %d', $table, $limit ), ARRAY_A );
	}

	public function housekeeping() {
		global $wpdb;
		$days        = absint( $this->settings->get( 'audit_retention_days', 30 ) );
		$cutoff      = gmdate( 'Y-m-d H:i:s', time() - $days * DAY_IN_SECONDS );
		$audit_table = $wpdb->prefix . 'npati_audit_log';
		$inbox_table = $wpdb->prefix . 'npati_event_inbox';
		$wpdb->query( $wpdb->prepare( 'DELETE FROM %i WHERE created_at < %s', $audit_table, $cutoff ) );
		$wpdb->query( $wpdb->prepare( 'DELETE FROM %i WHERE received_at < %s', $inbox_table, gmdate( 'Y-m-d H:i:s', time() - 7 * DAY_IN_SECONDS ) ) );
	}

	private function site_id() {
		return hash( 'sha256', network_site_url( '/' ) . '|' . get_current_blog_id() ); }
}
