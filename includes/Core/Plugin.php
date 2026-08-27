<?php
namespace NPATI\Hub\Core;

use NPATI\Hub\Admin\Admin;
use NPATI\Hub\Api\Client;
use NPATI\Hub\Api\RestController;
use NPATI\Hub\Auth\ConnectionService;
use NPATI\Hub\Database\AuditLog;
use NPATI\Hub\Gutenberg\Integration;
use NPATI\Hub\Seo\SeoManager;
use NPATI\Hub\Support\Diagnostics;
use NPATI\Hub\Content\ContentService;
use NPATI\Hub\Content\ProviderRegistry;
use NPATI\Hub\WooCommerce\Integration as WooCommerceIntegration;

defined( 'ABSPATH' ) || exit;

final class Plugin {
	private static $instance;
	private $booted = false;

	public static function instance() {
		if ( ! self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	public function boot() {
		if ( $this->booted ) {
			return;
		}
		$this->booted = true;

		$settings   = new Settings();
		$audit      = new AuditLog( $settings );
		$client     = new Client( $settings, $audit );
		$connection = new ConnectionService( $settings, $client, $audit );
		$content    = new ContentService( new ProviderRegistry() );
		$i18n       = new I18n( $settings, $connection );
		$i18n->register();

		( new Admin( $settings, $client, $connection, $audit ) )->register();
		( new RestController( $settings, $client, $connection, $audit, $content ) )->register();
		( new Integration( $settings, $client ) )->register();
		( new SeoManager() )->register();
		( new Diagnostics( $settings, $connection ) )->register();

		if ( class_exists( 'WooCommerce' ) ) {
			( new WooCommerceIntegration( $client, $connection, $audit ) )->register();
		}

		add_action( 'npati_hub_housekeeping', array( $audit, 'housekeeping' ) );
	}
}
