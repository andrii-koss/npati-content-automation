<?php
defined( 'WP_UNINSTALL_PLUGIN' ) || exit;

$npati_settings = get_option( 'npati_hub_settings', array() );
// Keep the user's connection, encrypted OpenAI credential and Hub Content
// tasks by default. WordPress upgrades and reinstallations must not erase
// planned work. Full cleanup remains an explicit Settings opt-in.
delete_transient( 'npati_hub_profile' );
if ( empty( $npati_settings['delete_on_uninstall'] ) ) {
	return;
}


// Removing the plugin must also remove its remote Hub integration. This uses
// only the site-scoped credential and never exposes social-network tokens.
global $wpdb;
$npati_connections_table = $wpdb->prefix . 'npati_connections';
$npati_table_exists      = $wpdb->get_var( $wpdb->prepare( 'SHOW TABLES LIKE %s', $npati_connections_table ) );
if ( $npati_connections_table === $npati_table_exists ) {
	$npati_connection = $wpdb->get_row( $wpdb->prepare( 'SELECT connection_id, credential FROM %i WHERE status = %s ORDER BY id DESC LIMIT 1', $npati_connections_table, 'connected' ), ARRAY_A );
	if ( ! empty( $npati_connection['connection_id'] ) && ! empty( $npati_connection['credential'] ) ) {
		$npati_api_base = defined( 'NPATI_HUB_API_URL' ) ? NPATI_HUB_API_URL : 'https://www.npati.com/hub/api/v1';
		$npati_api_base = untrailingslashit( esc_url_raw( $npati_api_base, array( 'https', 'http' ) ) );
		$npati_host     = strtolower( (string) wp_parse_url( $npati_api_base, PHP_URL_HOST ) );
		if ( in_array( $npati_host, array( 'www.npati.com', 'api.npati.com', 'localhost', '127.0.0.1' ), true ) ) {
			wp_remote_post(
				$npati_api_base . '/wordpress/connections/' . rawurlencode( $npati_connection['connection_id'] ) . '/uninstall',
				array(
					'timeout'   => 8,
					'sslverify' => ! in_array( $npati_host, array( 'localhost', '127.0.0.1' ), true ),
					'headers'   => array(
						'Accept'       => 'application/json',
						'Content-Type' => 'application/json',
						'X-API-Key'    => $npati_connection['credential'],
					),
					'body'      => '{}',
				)
			);
		}
	}
	// The remote credential is revoked during uninstall. Never leave a stale
	// local row marked as connected when plugin data is intentionally retained.
	$wpdb->query( $wpdb->prepare( 'UPDATE %i SET credential = %s, status = %s', $npati_connections_table, '', 'disconnected' ) );
}
foreach ( array( 'npati_connections', 'npati_content_map', 'npati_event_inbox', 'npati_audit_log' ) as $npati_suffix ) {
	$npati_table = $wpdb->prefix . $npati_suffix;
	$wpdb->query( $wpdb->prepare( 'DROP TABLE IF EXISTS %i', $npati_table ) );
}
delete_option( 'npati_hub_settings' );
delete_option( 'npati_hub_db_version' );
delete_option( 'npati_hub_last_security_event' );
// Explicit full cleanup removes the local provider credential as well.
delete_option( 'npati_hub_ai_openai' );
