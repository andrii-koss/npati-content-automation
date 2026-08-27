<?php
namespace NPATI\Hub\Admin;

use NPATI\Hub\Api\Client;
use NPATI\Hub\Auth\ConnectionService;
use NPATI\Hub\Core\Settings;
use NPATI\Hub\Database\AuditLog;

defined( 'ABSPATH' ) || exit;

final class Admin {
	private $settings;
	private $client;
	private $connection;
	private $audit;
	private $rendered = false;
	private $pages    = array( 'npati', 'npati-market', 'npati-hub-content', 'npati-content', 'npati-calendar', 'npati-connections', 'npati-security', 'npati-settings' );
	public function __construct( Settings $settings, Client $client, ConnectionService $connection, AuditLog $audit ) {
		$this->settings   = $settings;
		$this->client     = $client;
		$this->connection = $connection;
		$this->audit      = $audit;}
	public function register() {
		add_action( 'admin_menu', array( $this, 'menu' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'assets' ) );
		add_action( 'admin_init', array( $this, 'actions' ) );}
	public function menu() {
		add_menu_page( 'NPATI', 'NPATI', 'npati_view', 'npati', array( $this, 'page' ), NPATI_HUB_URL . 'assets/images/favicon.png', 58 );
		$items = array(
			'npati-market'      => __( 'NPATI Market', 'npati-content-automation' ),
			'npati-hub-content' => 'NPATI Hub',
			'npati-content'     => __( 'Content', 'npati-content-automation' ),
			'npati-calendar'    => __( 'Calendar', 'npati-content-automation' ),
			'npati-connections' => __( 'Connections', 'npati-content-automation' ),
			'npati-security'    => __( 'Security', 'npati-content-automation' ),
			'npati-settings'    => __( 'Settings', 'npati-content-automation' ),
		);
		foreach ( $items as $slug => $label ) {
			add_submenu_page( 'npati', $label, $label, $this->capability( $slug ), $slug, array( $this, 'page' ) );}
		remove_submenu_page( 'npati', 'npati' );
		remove_submenu_page( 'npati', 'npati-calendar' );
		remove_submenu_page( 'npati', 'npati-connections' );
	}
	private function capability( $slug ) {
		$map = array(
			'npati-market'      => 'npati_manage_market',
			'npati-hub-content' => 'npati_manage_hub',
			'npati-content'     => 'npati_manage_hub',
			'npati-calendar'    => 'npati_schedule',
			'npati-connections' => 'npati_manage_connection',
			'npati-security'    => 'npati_manage_security',
			'npati-settings'    => 'npati_manage_settings',
		);
		return $map[ $slug ] ?? 'npati_view';}
	public function assets( $hook ) {
		$menu_css_version = file_exists( NPATI_HUB_DIR . 'assets/css/admin-menu.css' ) ? (string) filemtime( NPATI_HUB_DIR . 'assets/css/admin-menu.css' ) : NPATI_HUB_VERSION;
		wp_enqueue_style( 'npati-hub-admin-menu', NPATI_HUB_URL . 'assets/css/admin-menu.css', array(), $menu_css_version );
		if ( 'toplevel_page_npati' !== $hook && 0 !== strpos( $hook, 'npati_page_' ) ) {
			return;
		}$status = $this->connection->status();
		$profile = get_transient( 'npati_hub_profile' );
		if ( ! is_array( $profile ) ) {
			$profile = null;
		}$locale     = function_exists( 'determine_locale' ) ? determine_locale() : get_locale();
		$language    = ! empty( $status['connected'] ) ? ( 'UA' === strtoupper( (string) $status['market'] ) ? 'uk' : 'en' ) : ( 0 === strpos( strtolower( (string) $locale ), 'uk' ) ? 'uk' : 'en' );
		$css_version = file_exists( NPATI_HUB_DIR . 'assets/css/admin.css' ) ? (string) filemtime( NPATI_HUB_DIR . 'assets/css/admin.css' ) : NPATI_HUB_VERSION;
		$js_version  = file_exists( NPATI_HUB_DIR . 'assets/js/admin.js' ) ? (string) filemtime( NPATI_HUB_DIR . 'assets/js/admin.js' ) : NPATI_HUB_VERSION;
		wp_enqueue_media();
		wp_enqueue_style( 'npati-hub-admin', NPATI_HUB_URL . 'assets/css/admin.css', array(), $css_version );
		wp_enqueue_script( 'npati-hub-admin', NPATI_HUB_URL . 'assets/js/admin.js', array( 'wp-api-fetch', 'wp-i18n', 'media-editor' ), $js_version, true );
		wp_add_inline_script(
			'npati-hub-admin',
			'window.NPATI_HUB_CONFIG=' . wp_json_encode(
				array(
					'restUrl'          => esc_url_raw( rest_url( 'npati/v1/' ) ),
					'nonce'            => wp_create_nonce( 'wp_rest' ),
					'market'           => $this->settings->get( 'market', 'US' ),
					'language'         => $language,
					'connected'        => ! empty( $status['connected'] ),
					'connectionId'     => $status['connection_id'] ?? '',
					'profile'          => $profile,
					'timezone'         => wp_timezone_string(),
					'adminBaseUrl'     => admin_url( 'admin.php?page=npati' ),
					'contentSampleUrl' => NPATI_HUB_URL . 'assets/samples/npati-content-tasks-sample.csv',
				)
			) . ';',
			'before'
		);}
	public function actions() {
		$page = isset( $_GET['page'] ) ? sanitize_key( wp_unslash( $_GET['page'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Read-only admin routing parameter.
		if ( ! is_admin() || ! in_array( $page, $this->pages, true ) ) {
			return; }
		$pairing = isset( $_GET['npati_pairing'] ) ? sanitize_key( wp_unslash( $_GET['npati_pairing'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- The external callback is authenticated by the stored PKCE verifier.
		if ( 'complete' === $pairing && current_user_can( 'npati_manage_connection' ) ) {
			$result  = $this->connection->complete();
			$success = ! is_wp_error( $result );
			set_transient( 'npati_hub_admin_message_' . get_current_user_id(), $success ? array( 'success', __( 'NPATI connected successfully.', 'npati-content-automation' ) ) : array( 'error', sanitize_text_field( $result->get_error_message() ) ), 60 );
			$target = add_query_arg(
				array(
					'page'                 => 'npati',
					'npati_pairing_result' => $success ? 'success' : 'error',
				),
				admin_url( 'admin.php' )
			);
			wp_safe_redirect( $target );
			exit; }
		$request_method = isset( $_SERVER['REQUEST_METHOD'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REQUEST_METHOD'] ) ) : '';
		if ( 'POST' !== $request_method ) {
			return; }
		$save_settings = isset( $_POST['npati_save_settings'] ) ? sanitize_text_field( wp_unslash( $_POST['npati_save_settings'] ) ) : '';
		if ( '1' === $save_settings && current_user_can( 'npati_manage_settings' ) ) {
			check_admin_referer( 'npati_save_settings' );
			$input = isset( $_POST['npati'] ) && is_array( $_POST['npati'] ) ? map_deep( wp_unslash( $_POST['npati'] ), 'sanitize_text_field' ) : array();
			$this->settings->update( $input );
			$this->audit->record( 'settings_updated', 'success' );
			set_transient( 'npati_hub_admin_message_' . get_current_user_id(), array( 'success', __( 'Settings saved.', 'npati-content-automation' ) ), 60 );
			wp_safe_redirect( admin_url( 'admin.php?page=npati-settings' ) );
			exit;}
	}
	public function page() {
		if ( $this->rendered ) {
			return;
		}$this->rendered = true;
		$slug            = isset( $_GET['page'] ) ? sanitize_key( wp_unslash( $_GET['page'] ) ) : 'npati'; // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Read-only admin routing parameter.
		$status          = $this->connection->status();
		$message         = get_transient( 'npati_hub_admin_message_' . get_current_user_id() );
		delete_transient( 'npati_hub_admin_message_' . get_current_user_id() );
		echo '<div class="wrap npati-hub-admin"><div class="npati-app-shell">';
		$this->app_header( $slug, $status );
		echo '<main class="npati-app-content">';
		if ( $message ) {
			echo '<div class="notice notice-' . esc_attr( $message[0] ) . ' is-dismissible"><p>' . esc_html( $message[1] ) . '</p></div>';}
		if ( empty( $status['connected'] ) ) {
			$this->connection_page();
		} elseif ( 'npati-settings' === $slug ) {
			$this->settings_page();
			$this->ai_settings_page();
		} elseif ( 'npati-security' === $slug ) {
			$this->security_page( $status );
		} else {
			$this->remote_page( $slug, $status );
		}echo '</main></div></div>';
	}
	private function app_header( $slug, $status ) {
		$user    = wp_get_current_user();
		$profile = get_transient( 'npati_hub_profile' );
		if ( ! is_array( $profile ) ) {
			$profile = array();
		}$name          = $profile['displayName'] ?? $profile['display_name'] ?? $status['username'] ?? $user->display_name;
		$username       = $profile['username'] ?? ( $status['username'] ?? '' );
		$email          = $profile['email'] ?? '';
		$avatar         = esc_url( $profile['avatar'] ?? $profile['avatarUrl'] ?? $profile['avatar_url'] ?? '' );
		$profile_url    = esc_url( $profile['profileUrl'] ?? $profile['profile_url'] ?? '' );
		$initial_source = $username ? $username : ( $name ? $name : 'N' );
		$initial        = strtoupper( substr( $initial_source, 0, 1 ) );
		$avatar_html    = $avatar ? '<img src="' . esc_url( $avatar ) . '" alt="" referrerpolicy="no-referrer">' : esc_html( $initial );
		$profile_name   = $username ? '@' . ltrim( (string) $username, '@' ) : $name;
		$sign_out       = ! empty( $status['connected'] ) && current_user_can( 'npati_manage_connection' ) ? '<button type="button" role="menuitem" data-profile-action="disconnect">' . esc_html__( 'Sign out', 'npati-content-automation' ) . '</button>' : '';
		$avatar_allowed = array(
			'img' => array(
				'src'            => true,
				'alt'            => true,
				'referrerpolicy' => true,
			),
		);
		$button_allowed = array(
			'button' => array(
				'type'                => true,
				'role'                => true,
				'data-profile-action' => true,
			),
		);
		echo '<header class="npati-app-header"><a class="npati-wordmark" href="' . esc_url( admin_url( 'admin.php?page=npati' ) ) . '" aria-label="NPATI"><span class="npati-wordmark-text">Npati<i>.</i></span></a><div class="npati-header-actions"><span class="npati-connection-pill ' . ( ! empty( $status['connected'] ) ? 'is-connected' : '' ) . '"><i></i>' . esc_html( ! empty( $status['connected'] ) ? __( 'Connected', 'npati-content-automation' ) : __( 'Offline', 'npati-content-automation' ) ) . '</span><div class="npati-profile-menu"><button type="button" id="npati-profile-trigger" class="npati-profile-trigger" aria-haspopup="menu" aria-expanded="false" aria-controls="npati-profile-dropdown"><span class="npati-avatar" data-profile-avatar data-fallback="' . esc_attr( $initial ) . '">' . wp_kses( $avatar_html, $avatar_allowed ) . '</span><span class="screen-reader-text">' . esc_html__( 'Open profile menu', 'npati-content-automation' ) . '</span></button><div id="npati-profile-dropdown" class="npati-profile-dropdown" role="menu" hidden><div class="npati-profile-summary"><span class="npati-avatar npati-avatar-large" data-profile-avatar data-fallback="' . esc_attr( $initial ) . '">' . wp_kses( $avatar_html, $avatar_allowed ) . '</span><div><strong data-profile-name>' . esc_html( $profile_name ? $profile_name : __( 'NPATI profile', 'npati-content-automation' ) ) . '</strong><span data-profile-email>' . esc_html( $email ) . '</span></div></div><button type="button" role="menuitem" data-profile-action="avatar">' . esc_html__( 'Change profile photo', 'npati-content-automation' ) . '</button><a role="menuitem" data-profile-link target="_blank" rel="noopener noreferrer" ' . ( $profile_url ? 'href="' . esc_url( $profile_url ) . '"' : 'hidden' ) . '>' . esc_html__( 'View NPATI profile', 'npati-content-automation' ) . '</a><a role="menuitem" href="' . esc_url( admin_url( 'admin.php?page=npati-connections' ) ) . '">' . esc_html__( 'Connections', 'npati-content-automation' ) . '</a><a role="menuitem" href="' . esc_url( admin_url( 'admin.php?page=npati-settings' ) ) . '">' . esc_html__( 'Settings', 'npati-content-automation' ) . '</a>' . wp_kses( $sign_out, $button_allowed ) . '<p class="npati-profile-status" role="status" aria-live="polite"></p></div></div></div></header>';
		$base = admin_url( 'admin.php?page=npati' );
		echo '<nav class="npati-section-nav" aria-label="NPATI"><a data-npati-route="market" data-route="market" href="' . esc_url( $base . '#market' ) . '">' . esc_html__( 'Market', 'npati-content-automation' ) . '</a><a data-npati-route="hub" data-route="hub/overview" href="' . esc_url( $base . '#hub/overview' ) . '">Hub</a><a data-npati-route="content" data-route="content" href="' . esc_url( $base . '#content' ) . '">' . esc_html__( 'Content', 'npati-content-automation' ) . '</a><a ' . ( 'npati-security' === $slug ? 'class="active" ' : '' ) . 'href="' . esc_url( admin_url( 'admin.php?page=npati-security' ) ) . '">' . esc_html__( 'Security', 'npati-content-automation' ) . '</a><a ' . ( 'npati-settings' === $slug ? 'class="active" ' : '' ) . 'href="' . esc_url( admin_url( 'admin.php?page=npati-settings' ) ) . '">' . esc_html__( 'Settings', 'npati-content-automation' ) . '</a></nav>';
	}
	private function connection_page() {
		echo '<section class="npati-onboarding"><h1>' . esc_html__( 'One workspace for your store, content and publishing.', 'npati-content-automation' ) . '</h1><div class="npati-onboarding-actions"><button type="button" class="npati-primary-button npati-connect-button">' . esc_html__( 'Connect NPATI', 'npati-content-automation' ) . '</button><button type="button" class="npati-secondary-button npati-register-toggle" aria-expanded="false" aria-controls="npati-registration-form">' . esc_html__( 'Create account', 'npati-content-automation' ) . '</button></div><p class="npati-onboarding-copy">' . esc_html__( 'Connect your NPATI account or create a new one without leaving WordPress. Social credentials are never stored by WordPress.', 'npati-content-automation' ) . '</p><form id="npati-registration-form" class="npati-registration-form" hidden><h2>' . esc_html__( 'Create NPATI account', 'npati-content-automation' ) . '</h2><label><span>' . esc_html__( 'Nickname', 'npati-content-automation' ) . '</span><input name="username" type="text" autocomplete="username" minlength="3" maxlength="30" pattern="[A-Za-z0-9_]+" placeholder="' . esc_attr__( 'Nickname', 'npati-content-automation' ) . '" required></label><label><span>' . esc_html__( 'Email', 'npati-content-automation' ) . '</span><input name="email" type="email" autocomplete="email" placeholder="Email" required></label><label><span>' . esc_html__( 'Password', 'npati-content-automation' ) . '</span><input name="password" type="password" autocomplete="new-password" minlength="8" placeholder="' . esc_attr__( 'Password', 'npati-content-automation' ) . '" required></label><button type="submit" class="npati-primary-button">' . esc_html__( 'Create account', 'npati-content-automation' ) . '</button><p class="npati-registration-note">' . esc_html__( 'The password is sent directly to NPATI Hub and is not stored by WordPress.', 'npati-content-automation' ) . '</p></form><p class="npati-action-status" role="status" aria-live="polite"></p></section>';
	}
	private function remote_page( $slug, $status ) {
		$default = 'npati-calendar' === $slug ? 'calendar' : ( 'npati-connections' === $slug ? 'connections' : 'overview' );
		$view    = isset( $_GET['view'] ) ? sanitize_key( wp_unslash( $_GET['view'] ) ) : $default; // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Read-only view selector.
		$this->hub_tabs( $view );
		echo '<div id="npati-hub-app" data-page="' . esc_attr( $slug ) . '" data-view="' . esc_attr( $view ) . '"><div class="npati-skeleton"><i></i><i></i><i></i></div></div>';}
	private function hub_tabs( $view ) {
		$tabs = array(
			'overview'    => __( 'Overview', 'npati-content-automation' ),
			'create'      => __( 'Create Post', 'npati-content-automation' ),
			'calendar'    => __( 'Calendar', 'npati-content-automation' ),
			'connections' => __( 'Connections', 'npati-content-automation' ),
		);
		$base = admin_url( 'admin.php?page=npati' );
		echo '<div class="npati-hub-title"><div><p class="npati-eyebrow">NPATI HUB</p><h1>' . esc_html__( 'Publishing workspace', 'npati-content-automation' ) . '</h1></div><div class="npati-hub-overview-actions"><button class="npati-secondary-button" data-route="hub/connections">+ ' . esc_html__( 'Add integration', 'npati-content-automation' ) . '</button><button class="npati-primary-button" data-route="hub/create">' . esc_html__( 'Create publication', 'npati-content-automation' ) . '</button></div></div><nav class="npati-hub-tabs">';
		foreach ( $tabs as $key => $label ) {
			echo '<a data-route="hub/' . esc_attr( $key ) . '" data-npati-route="hub/' . esc_attr( $key ) . '" href="' . esc_url( $base . '#hub/' . $key ) . '">' . esc_html( $label ) . '</a>';
		}echo '</nav>';}
	private function security_page( $status ) {
		$https      = $this->security_status_item( 'HTTPS', 'https' === wp_parse_url( home_url( '/' ), PHP_URL_SCHEME ) );
		$connection = $this->security_status_item( __( 'Connection', 'npati-content-automation' ), ! empty( $status['connected'] ) );
		$signature  = $this->security_status_item( __( 'Webhook signature', 'npati-content-automation' ), function_exists( 'sodium_crypto_sign_verify_detached' ) );
		echo '<div class="npati-grid npati-security-basic"><article class="npati-card"><h2>' . esc_html__( 'Security status', 'npati-content-automation' ) . '</h2><ul class="npati-status-list">' . wp_kses_post( $https . $connection . $signature ) . '<li><span>' . esc_html__( 'Social tokens in WordPress', 'npati-content-automation' ) . '</span><strong class="npati-security-value is-private">' . esc_html__( 'Never', 'npati-content-automation' ) . '</strong></li></ul></article><article class="npati-card npati-security-log"><h2>' . esc_html__( 'Recent activity', 'npati-content-automation' ) . '</h2><div class="npati-security-table" tabindex="0" aria-label="' . esc_attr__( 'Recent security activity', 'npati-content-automation' ) . '"><table class="widefat striped"><tbody>';
		foreach ( $this->audit->recent( 15 ) as $row ) {
			echo '<tr><td>' . esc_html( $row['created_at'] ) . '</td><td>' . esc_html( $row['event'] ) . '</td><td><strong class="npati-audit-status ' . ( 'success' === $row['status'] ? 'is-success' : 'is-failed' ) . '">' . esc_html( $row['status'] ) . '</strong></td></tr>';}
		echo '</tbody></table></div></article></div>';
	}
	private function security_status_item( $label, $ok ) {
		return '<li><span>' . esc_html( $label ) . '</span><strong class="npati-security-value ' . ( $ok ? 'is-ok' : 'is-warning' ) . '" aria-label="' . esc_attr( $ok ? __( 'Available', 'npati-content-automation' ) : __( 'Attention required', 'npati-content-automation' ) ) . '">' . esc_html( $ok ? '✓' : '!' ) . '</strong></li>';}
	private function settings_page() {
		$s              = $this->settings->all();
		$connection     = $this->connection->status();
		$profile_market = ! empty( $connection['connected'] ) ? $connection['market'] : $s['market'];
		echo '<form method="post" class="npati-card npati-settings-basic">';
		wp_nonce_field( 'npati_save_settings' );
		echo '<input type="hidden" name="npati_save_settings" value="1"><h2>' . esc_html__( 'Settings', 'npati-content-automation' ) . '</h2><table class="form-table"><tr><th>' . esc_html__( 'NPATI market', 'npati-content-automation' ) . '</th><td><strong class="npati-settings-market">' . esc_html( strtoupper( (string) $profile_market ) ) . '</strong><p class="description">' . esc_html__( 'The market is set automatically from the country in your NPATI profile and cannot be changed in WordPress.', 'npati-content-automation' ) . '</p></td></tr><tr><th>' . esc_html__( 'Default WordPress author', 'npati-content-automation' ) . '</th><td>' . wp_dropdown_users(
			array(
				'name'             => 'npati[default_author]',
				'selected'         => absint( $s['default_author'] ),
				'role__in'         => array( 'administrator', 'editor', 'author' ),
				'show_option_none' => __( 'Use site administrator', 'npati-content-automation' ),
				'echo'             => false,
			)
		) . '</td></tr><tr><th>' . esc_html__( 'Store link', 'npati-content-automation' ) . '</th><td><label><input type="checkbox" name="npati[store_link_enabled]" value="1" ' . checked( $s['store_link_enabled'], true, false ) . '> ' . esc_html__( 'Show in the footer (explicit opt-in)', 'npati-content-automation' ) . '</label><p><input class="regular-text" name="npati[store_link_text]" value="' . esc_attr( $s['store_link_text'] ) . '"></p></td></tr><tr><th>' . esc_html__( 'Security mode', 'npati-content-automation' ) . '</th><td><select name="npati[security_mode]"><option value="standard" ' . selected( $s['security_mode'], 'standard', false ) . '>' . esc_html__( 'Standard', 'npati-content-automation' ) . '</option><option value="high" ' . selected( $s['security_mode'], 'high', false ) . '>' . esc_html__( 'High Security', 'npati-content-automation' ) . '</option></select></td></tr><tr><th>' . esc_html__( 'Hub → WordPress', 'npati-content-automation' ) . '</th><td><label><input type="checkbox" name="npati[allow_remote_publish]" value="1" ' . checked( $s['allow_remote_publish'], true, false ) . '> ' . esc_html__( 'Allow signed commands to publish (otherwise drafts only)', 'npati-content-automation' ) . '</label></td></tr><tr><th>' . esc_html__( 'Audit retention', 'npati-content-automation' ) . '</th><td><select name="npati[audit_retention_days]">';foreach ( array( 7, 30, 90 ) as $days ) {
			/* translators: %d: Number of days to retain audit log entries. */
			$days_label = sprintf( __( '%d days', 'npati-content-automation' ), $days );
			echo '<option value="' . esc_attr( $days ) . '" ' . selected( $s['audit_retention_days'], $days, false ) . '>' . esc_html( $days_label ) . '</option>';
		}echo '</select></td></tr><tr><th>' . esc_html__( 'Uninstall', 'npati-content-automation' ) . '</th><td><label><input type="checkbox" name="npati[delete_on_uninstall]" value="1" ' . checked( $s['delete_on_uninstall'], true, false ) . '> ' . esc_html__( 'Delete plugin settings and local integration tables on uninstall', 'npati-content-automation' ) . '</label></td></tr></table><p class="npati-settings-actions"><button class="button button-primary">' . esc_html__( 'Save Settings', 'npati-content-automation' ) . '</button></p></form>';}
	private function ai_settings_page() {
		echo '<section class="npati-card npati-settings-basic npati-settings-ai"><h2>' . esc_html__( 'OpenAI connection', 'npati-content-automation' ) . '</h2><p class="description">' . esc_html__( 'The API key is encrypted and stored only on this WordPress site. It is never sent to NPATI Hub.', 'npati-content-automation' ) . '</p><form id="npati-settings-ai-form"><table class="form-table"><tr><th><label for="npati-openai-key">' . esc_html__( 'OpenAI API Key', 'npati-content-automation' ) . '</label></th><td><input id="npati-openai-key" class="npati-settings-ai-control" name="apiKey" type="password" autocomplete="new-password" placeholder="sk-…"><p class="description">' . esc_html__( 'Enter the key again only when connecting or changing it.', 'npati-content-automation' ) . '</p></td></tr><tr><th><label for="npati-openai-model">' . esc_html__( 'Model', 'npati-content-automation' ) . '</label></th><td><select id="npati-openai-model" class="npati-settings-ai-control" name="model"><option value="">' . esc_html__( 'Test connection to load models', 'npati-content-automation' ) . '</option></select></td></tr><tr><th>' . esc_html__( 'Connection status', 'npati-content-automation' ) . '</th><td><strong class="npati-ai-state" data-ai-state>' . esc_html__( 'Checking…', 'npati-content-automation' ) . '</strong></td></tr></table><div class="npati-settings-ai-actions"><button type="button" class="npati-secondary-button" data-settings-ai="test">' . esc_html__( 'Test Connection', 'npati-content-automation' ) . '</button><button type="submit" class="npati-primary-button">' . esc_html__( 'Save', 'npati-content-automation' ) . '</button><button type="button" class="npati-link-danger" data-settings-ai="disconnect" hidden>' . esc_html__( 'Disconnect', 'npati-content-automation' ) . '</button><p role="status" aria-live="polite"></p></div></form></section>';
	}
}
