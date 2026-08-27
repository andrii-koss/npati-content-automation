<?php
namespace NPATI\Hub\Core;

defined( 'ABSPATH' ) || exit;

final class Activator {
	public static function activate( $network_wide = false ) {
		if ( is_multisite() && $network_wide ) {
			$site_ids = get_sites(
				array(
					'fields' => 'ids',
					'number' => 0,
				)
			);
			foreach ( $site_ids as $site_id ) {
				switch_to_blog( $site_id );
				self::activate_site();
				restore_current_blog();
			}
			return;
		}
		self::activate_site();
	}

	private static function activate_site() {
		global $wpdb;
		require_once ABSPATH . 'wp-admin/includes/upgrade.php';
		$charset = $wpdb->get_charset_collate();
		$tables  = array(
			"CREATE TABLE {$wpdb->prefix}npati_connections (
			 id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
			 connection_id varchar(191) NOT NULL,
			 site_id varchar(191) NOT NULL,
			 market char(2) NOT NULL,
			 username varchar(191) NOT NULL DEFAULT '',
			 credential text NOT NULL,
			 hub_public_key text NULL,
			 permissions longtext NULL,
			 status varchar(32) NOT NULL DEFAULT 'connected',
			 created_at datetime NOT NULL,
			 last_seen_at datetime NULL,
			 PRIMARY KEY  (id),
			 UNIQUE KEY connection_id (connection_id),
			 UNIQUE KEY site_id (site_id)
			) $charset;",
			"CREATE TABLE {$wpdb->prefix}npati_content_map (
			 id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
			 wp_object_id bigint(20) unsigned NOT NULL,
			 wp_object_type varchar(40) NOT NULL,
			 remote_type varchar(40) NOT NULL,
			 remote_id varchar(191) NOT NULL,
			 sync_direction varchar(24) NOT NULL,
			 local_version bigint(20) unsigned NOT NULL DEFAULT 0,
			 remote_version bigint(20) unsigned NOT NULL DEFAULT 0,
			 content_hash char(64) NULL,
			 last_synced_at datetime NULL,
			 sync_status varchar(24) NOT NULL DEFAULT 'not_synced',
			 PRIMARY KEY  (id),
			 UNIQUE KEY object_remote (wp_object_id,wp_object_type,remote_type,remote_id)
			) $charset;",
			"CREATE TABLE {$wpdb->prefix}npati_event_inbox (
			 request_id varchar(191) NOT NULL,
			 received_at datetime NOT NULL,
			 processed_at datetime NULL,
			 status varchar(24) NOT NULL,
			 payload_hash char(64) NOT NULL,
			 PRIMARY KEY  (request_id),
			 KEY received_at (received_at)
			) $charset;",
			"CREATE TABLE {$wpdb->prefix}npati_audit_log (
			 id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
			 created_at datetime NOT NULL,
			 request_id varchar(191) NULL,
			 event varchar(120) NOT NULL,
			 status varchar(32) NOT NULL,
			 user_id bigint(20) unsigned NULL,
			 site_id varchar(191) NULL,
			 error_code varchar(120) NULL,
			 context longtext NULL,
			 PRIMARY KEY  (id),
			 KEY created_at (created_at),
			 KEY event (event)
			) $charset;",
		);
		foreach ( $tables as $sql ) {
			dbDelta( $sql );
		}
		update_option( 'npati_hub_db_version', NPATI_HUB_DB_VERSION, false );
		if ( false === get_option( Settings::OPTION, false ) ) {
			add_option( Settings::OPTION, ( new Settings() )->defaults(), '', false );
		}
		$administrator = get_role( 'administrator' );
		if ( $administrator ) {
			foreach ( self::capabilities() as $cap ) {
				$administrator->add_cap( $cap ); }
		}
		if ( ! wp_next_scheduled( 'npati_hub_housekeeping' ) ) {
			wp_schedule_event( time() + HOUR_IN_SECONDS, 'daily', 'npati_hub_housekeeping' );
		}
	}

	public static function deactivate() {
		wp_clear_scheduled_hook( 'npati_hub_housekeeping' );
	}

	public static function capabilities() {
		return array( 'npati_view', 'npati_manage_connection', 'npati_manage_market', 'npati_create_market_listing', 'npati_manage_hub', 'npati_publish', 'npati_schedule', 'npati_manage_automations', 'npati_view_analytics', 'npati_manage_security', 'npati_manage_settings' );
	}
}
