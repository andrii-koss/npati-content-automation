<?php
namespace NPATI\Hub\Content;

defined( 'ABSPATH' ) || exit;

final class OpenAiProvider implements AiProviderInterface {
	const OPTION   = 'npati_hub_ai_openai';
	const API_BASE = 'https://api.openai.com/v1';

	public function id() {
		return 'openai'; }
	public function is_connected() {
		$value = get_option( self::OPTION, array() );
		return ! empty( $value['key'] ) && ! empty( $value['model'] ); }
	public function selected_model() {
		$value = get_option( self::OPTION, array() );
		return sanitize_text_field( (string) ( $value['model'] ?? '' ) ); }

	public function models( $api_key = '' ) {
		$key = $api_key ? trim( (string) $api_key ) : $this->key();
		if ( ! $key ) {
			throw new \RuntimeException( esc_html__( 'OpenAI API key is required.', 'npati-content-automation' ) ); }
		$response = $this->request( 'GET', '/models', array(), $key, 20 );
		$models   = array();
		foreach ( (array) ( $response['data'] ?? array() ) as $item ) {
			$id = sanitize_text_field( (string) ( $item['id'] ?? '' ) );
			if ( preg_match( '/^(gpt-|o[1345](?:-|$))/', $id ) && ! preg_match( '/(audio|image|realtime|search|transcribe|tts|instruct)/i', $id ) ) {
				$models[] = $id; }
		}
		natcasesort( $models );
		return array_values( array_unique( $models ) );
	}

	public function test( $api_key, $model = '' ) {
		$models = $this->models( $api_key );
		if ( $model && ! in_array( $model, $models, true ) ) {
			throw new \RuntimeException( esc_html__( 'The selected model is not available for this API key.', 'npati-content-automation' ) ); }
		return array(
			'connected' => true,
			'models'    => $models,
			'model'     => $model && in_array( $model, $models, true ) ? $model : ( $models[0] ?? '' ),
		);
	}

	public function connect( $api_key, $model ) {
		$api_key = trim( (string) $api_key );
		$model   = sanitize_text_field( (string) $model );
		$result  = $this->test( $api_key, $model );
		if ( ! $result['model'] ) {
			throw new \RuntimeException( esc_html__( 'No compatible OpenAI text model is available.', 'npati-content-automation' ) ); }
		update_option(
			self::OPTION,
			array(
				'key'          => $this->encrypt( $api_key ),
				'model'        => $result['model'],
				'connected_at' => time(),
			),
			false
		);
		return array(
			'connected' => true,
			'model'     => $result['model'],
			'models'    => $result['models'],
		);
	}

	public function disconnect() {
		delete_option( self::OPTION ); }

	public function generate_article( array $task ) {
		$schema = array(
			'type'                 => 'object',
			'additionalProperties' => false,
			'required'             => array( 'seo_title', 'article_html', 'meta_title', 'meta_description', 'excerpt' ),
			'properties'           => array(
				'seo_title'        => array( 'type' => 'string' ),
				'article_html'     => array( 'type' => 'string' ),
				'meta_title'       => array( 'type' => 'string' ),
				'meta_description' => array( 'type' => 'string' ),
				'excerpt'          => array( 'type' => 'string' ),
			),
		);
		$prompt = "Create a complete SEO article from this editorial task. Use natural keyword placement and semantic HTML with paragraphs and a correct H2/H3 hierarchy. Do not include an H1 inside article_html.\n\nTask:\n" . wp_json_encode(
			array(
				'title'       => $task['title'] ?? '',
				'description' => $task['description'] ?? '',
				'keywords'    => $task['keywords'] ?? array(),
				'category'    => $task['category'] ?? '',
			),
			JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
		);
		return $this->structured_response( 'You are an expert WordPress editor and SEO writer. Return factual, useful content without keyword stuffing.', $prompt, 'npati_article', $schema, 12000 );
	}

	public function generate_social_post( array $article ) {
		$schema = array(
			'type'                 => 'object',
			'additionalProperties' => false,
			'required'             => array( 'text' ),
			'properties'           => array( 'text' => array( 'type' => 'string' ) ),
		);
		$prompt = "Turn the following published article into a concise, engaging social post with the key information. Do not invent facts. Keep the result editable and platform-neutral.\n\nTitle: " . ( $article['title'] ?? '' ) . "\nURL: " . ( $article['url'] ?? '' ) . "\nArticle:\n" . wp_strip_all_tags( (string) ( $article['content'] ?? '' ) );
		return $this->structured_response( 'You create concise social copy from finished articles.', $prompt, 'npati_social_post', $schema, 1200 );
	}

	private function structured_response( $instructions, $input, $name, array $schema, $max_tokens ) {
		$body     = array(
			'model'             => $this->selected_model(),
			'store'             => false,
			'instructions'      => $instructions,
			'input'             => $input,
			'max_output_tokens' => $max_tokens,
			'text'              => array(
				'format' => array(
					'type'   => 'json_schema',
					'name'   => $name,
					'strict' => true,
					'schema' => $schema,
				),
			),
		);
		$response = $this->request( 'POST', '/responses', $body, $this->key(), 180 );
		$text     = (string) ( $response['output_text'] ?? '' );
		if ( ! $text ) {
			foreach ( (array) ( $response['output'] ?? array() ) as $item ) {
				foreach ( (array) ( $item['content'] ?? array() ) as $content ) {
					if ( 'output_text' === ( $content['type'] ?? '' ) ) {
							$text .= (string) ( $content['text'] ?? '' ); }
				}
			}
		}
		$data = json_decode( $text, true );
		if ( ! is_array( $data ) ) {
			throw new \RuntimeException( esc_html__( 'OpenAI returned an invalid structured response.', 'npati-content-automation' ) ); }
		return $data;
	}

	private function request( $method, $path, array $body, $key, $timeout ) {
		$args = array(
			'method'      => $method,
			'timeout'     => $timeout,
			'redirection' => 0,
			'headers'     => array(
				'Authorization' => 'Bearer ' . $key,
				'Accept'        => 'application/json',
				'Content-Type'  => 'application/json',
			),
		);
		if ( 'GET' !== $method ) {
			$args['body'] = wp_json_encode( $body ); }
		$response = wp_remote_request( self::API_BASE . $path, $args );
		if ( is_wp_error( $response ) ) {
			throw new \RuntimeException( esc_html( $response->get_error_message() ) ); }
		$status  = (int) wp_remote_retrieve_response_code( $response );
		$payload = json_decode( wp_remote_retrieve_body( $response ), true );
		if ( $status < 200 || $status >= 300 ) {
			throw new \RuntimeException( esc_html( sanitize_text_field( (string) ( $payload['error']['message'] ?? __( 'OpenAI request failed.', 'npati-content-automation' ) ) ) ) ); }
		return is_array( $payload ) ? $payload : array();
	}

	private function key() {
		$value = get_option( self::OPTION, array() );
		return empty( $value['key'] ) ? '' : $this->decrypt( $value['key'] ); }
	private function encryption_key() {
		return hash( 'sha256', wp_salt( 'auth' ) . '|npati-openai-key', true ); }
	private function encrypt( $plain ) {
		if ( ! function_exists( 'sodium_crypto_secretbox' ) ) {
			throw new \RuntimeException( esc_html__( 'Sodium encryption is required to store the API key.', 'npati-content-automation' ) );
		} $nonce = random_bytes( SODIUM_CRYPTO_SECRETBOX_NONCEBYTES );
		return base64_encode( $nonce . sodium_crypto_secretbox( $plain, $nonce, $this->encryption_key() ) ); }
	private function decrypt( $encoded ) {
		if ( ! function_exists( 'sodium_crypto_secretbox_open' ) ) {
			return '';
		} $raw = base64_decode( (string) $encoded, true );
		if ( false === $raw || strlen( $raw ) <= SODIUM_CRYPTO_SECRETBOX_NONCEBYTES ) {
			return '';
		} $nonce = substr( $raw, 0, SODIUM_CRYPTO_SECRETBOX_NONCEBYTES );
		$plain   = sodium_crypto_secretbox_open( substr( $raw, SODIUM_CRYPTO_SECRETBOX_NONCEBYTES ), $nonce, $this->encryption_key() );
		return false === $plain ? '' : $plain; }
}
