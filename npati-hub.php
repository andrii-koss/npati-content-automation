<?php
/**
 * Plugin Name:       NPATI Content Automation
 * Plugin URI:        https://github.com/andrii-koss/npati-content-automation
 * Description:       Automate WordPress content with NPATI Hub: create, edit, schedule and publish posts, manage media, and optionally generate content with OpenAI.
 * Version:           1.0.2
 * Requires at least: 6.4
 * Requires PHP:      7.4
 * Author:            NPATI
 * Author URI:        https://www.npati.com/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       npati-content-automation
 * Domain Path:       /languages
 */

defined( 'ABSPATH' ) || exit;

define( 'NPATI_HUB_VERSION', '1.0.2' );
define( 'NPATI_HUB_DB_VERSION', '1' );
define( 'NPATI_HUB_FILE', __FILE__ );
define( 'NPATI_HUB_DIR', plugin_dir_path( __FILE__ ) );
define( 'NPATI_HUB_URL', plugin_dir_url( __FILE__ ) );

spl_autoload_register(
	static function ( $class ) {
		$prefix = 'NPATI\\Hub\\';
		if ( 0 !== strpos( $class, $prefix ) ) {
			return;
		}
		$relative = str_replace( '\\', DIRECTORY_SEPARATOR, substr( $class, strlen( $prefix ) ) );
		$file     = NPATI_HUB_DIR . 'includes' . DIRECTORY_SEPARATOR . $relative . '.php';
		if ( is_readable( $file ) ) {
			require_once $file;
		}
	}
);

// Activation callbacks run before plugins_loaded. Load the activator
// explicitly so activation never depends on callback autoload behavior.
require_once NPATI_HUB_DIR . 'includes' . DIRECTORY_SEPARATOR . 'Core' . DIRECTORY_SEPARATOR . 'Activator.php';

register_activation_hook( __FILE__, array( 'NPATI\\Hub\\Core\\Activator', 'activate' ) );
register_deactivation_hook( __FILE__, array( 'NPATI\\Hub\\Core\\Activator', 'deactivate' ) );

add_action(
	'plugins_loaded',
	static function () {
		NPATI\Hub\Core\Plugin::instance()->boot();
	}
);
