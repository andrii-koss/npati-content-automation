<?php
namespace NPATI\Hub\WooCommerce;

use NPATI\Hub\Api\Client;
use NPATI\Hub\Auth\ConnectionService;
use NPATI\Hub\Database\AuditLog;

defined( 'ABSPATH' ) || exit;

final class Integration {
	private $client;
	private $connection;
	private $audit;
	public function __construct( Client $client, ConnectionService $connection, AuditLog $audit ) {
		$this->client     = $client;
		$this->connection = $connection;
		$this->audit      = $audit;}
	public function register() {
		add_action( 'add_meta_boxes_product', array( $this, 'box' ) );
		add_action( 'save_post_product', array( $this, 'save' ), 10, 2 );
		add_action( 'before_delete_post', array( $this, 'deleted' ) );}
	public function box() {
		add_meta_box( 'npati-product', __( 'WooCommerce → NPATI', 'npati-content-automation' ), array( $this, 'render' ), 'product', 'side' );}
	public function render( $post ) {
		wp_nonce_field( 'npati_product_save', 'npati_product_nonce' );
		echo '<label><input type="checkbox" name="npati_publish_product" value="1"> ' . esc_html__( 'Create a draft NPATI sync job', 'npati-content-automation' ) . '</label><p class="description">' . esc_html__( 'Deleting this product will never delete its NPATI listing automatically.', 'npati-content-automation' ) . '</p>';}
	public function save( $post_id, $post ) {
		if ( ! isset( $_POST['npati_product_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['npati_product_nonce'] ) ), 'npati_product_save' ) || ! current_user_can( 'edit_post', $post_id ) || empty( $_POST['npati_publish_product'] ) || wp_is_post_revision( $post_id ) ) {
			return;
		}$status = $this->connection->status();
		if ( empty( $status['connected'] ) ) {
			return;
		}$product = wc_get_product( $post_id );
		if ( ! $product ) {
			return;
		}$payload = array(
			'source'           => 'wordpress',
			'source_object_id' => (string) $post_id,
			'title'            => $product->get_name(),
			'description'      => wp_strip_all_tags( $product->get_description() ),
			'price'            => $product->get_regular_price(),
			'currency'         => get_woocommerce_currency(),
			'stock_status'     => $product->get_stock_status(),
			'images'           => array_values( array_filter( array_map( 'wp_get_attachment_url', $product->get_gallery_image_ids() ) ) ),
		);
		try {
			$this->client->post( '/wordpress/market/drafts', $payload, 'wc-' . $post_id . '-' . $post->post_modified_gmt );
			$this->audit->record( 'woocommerce_draft_sent', 'success', array( 'post_id' => $post_id ) );
		} catch ( \Exception $e ) {
			$this->audit->record( 'woocommerce_draft_sent', 'failed', array( 'post_id' => $post_id ), '', $e instanceof \NPATI\Hub\Api\ApiException ? $e->error_code() : 'api_error' );}}
	public function deleted( $post_id ) {
		if ( 'product' !== get_post_type( $post_id ) ) {
			return;
		}$this->audit->record(
			'woocommerce_product_deleted',
			'warning',
			array(
				'post_id'       => $post_id,
				'remote_action' => 'none',
			)
		);}
}
