<?php
namespace NPATI\Hub\Api;

defined( 'ABSPATH' ) || exit;

final class ApiException extends \RuntimeException {
	private $status;
	private $request_id;
	private $error_code;
	public function __construct( $message, $code = 'API_ERROR', $status = 500, $request_id = '' ) {
		parent::__construct( $message, 0 );
		$this->status     = absint( $status );
		$this->request_id = sanitize_text_field( $request_id );
		$this->error_code = sanitize_key( $code );
	}
	public function error_code() {
		return $this->error_code; }
	public function status() {
		return $this->status; }
	public function request_id() {
		return $this->request_id; }
}
