<?php
namespace NPATI\Hub\Support;

use NPATI\Hub\Auth\ConnectionService;
use NPATI\Hub\Core\Settings;

defined( 'ABSPATH' ) || exit;

final class Diagnostics {
	private $settings;
	private $connection;
	public function __construct( Settings $settings, ConnectionService $connection ) {
		$this->settings   = $settings;
		$this->connection = $connection;}
	public function register() {
		add_filter( 'site_status_tests', array( $this, 'tests' ) );
		add_action( 'admin_init', array( $this, 'privacy' ) );}
	public function tests( $tests ) {
		$tests['direct']['npati_https'] = array(
			'label' => __( 'NPATI HTTPS readiness', 'npati-content-automation' ),
			'test'  => array( $this, 'https_test' ),
		);
		return $tests;}
	public function https_test() {
		$https = 'https' === wp_parse_url( home_url( '/' ), PHP_URL_SCHEME );
		return array(
			'label'       => $https ? __( 'NPATI webhook can use HTTPS', 'npati-content-automation' ) : __( 'NPATI requires HTTPS for production webhooks', 'npati-content-automation' ),
			'status'      => $https ? 'good' : 'recommended',
			'badge'       => array(
				'label' => 'NPATI',
				'color' => 'blue',
			),
			'description' => '<p>' . esc_html( $https ? __( 'This site uses HTTPS.', 'npati-content-automation' ) : __( 'Enable HTTPS before connecting NPATI Hub in production.', 'npati-content-automation' ) ) . '</p>',
			'actions'     => '',
			'test'        => 'npati_https',
		);}
	public function privacy() {
		if ( function_exists( 'wp_add_privacy_policy_content' ) ) {
			wp_add_privacy_policy_content( 'NPATI Hub', wp_kses_post( '<p>' . __( 'When an administrator explicitly connects this site, the plugin sends the site URL, site name, selected NPATI market, WordPress/PHP/plugin versions, and content selected for synchronization to NPATI and NPATI Hub. Disconnecting stops synchronization. Social-network credentials are stored by NPATI Hub, not WordPress.', 'npati-content-automation' ) . '</p>' ) );
		}}
}
