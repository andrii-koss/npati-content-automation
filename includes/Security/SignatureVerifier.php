<?php
namespace NPATI\Hub\Security;

defined( 'ABSPATH' ) || exit;

final class SignatureVerifier {
	public function canonical( $method, $path, $timestamp, $request_id, $body ) {
		return strtoupper( $method ) . "\n" . $path . "\n" . $timestamp . "\n" . $request_id . "\n" . hash( 'sha256', $body );
	}

	public function verify( $signature, $public_key, $canonical ) {
		if ( ! function_exists( 'sodium_crypto_sign_verify_detached' ) ) {
			return new \WP_Error( 'crypto_unavailable', 'Ed25519 verification is unavailable on this server.' ); }
		$signature_bin = base64_decode( $signature, true );
		$key_bin       = base64_decode( $public_key, true );
		if ( false === $signature_bin || false === $key_bin || SODIUM_CRYPTO_SIGN_BYTES !== strlen( $signature_bin ) || SODIUM_CRYPTO_SIGN_PUBLICKEYBYTES !== strlen( $key_bin ) ) {
			return false; }
		return sodium_crypto_sign_verify_detached( $signature_bin, $canonical, $key_bin );
	}
}
