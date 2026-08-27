<?php
namespace NPATI\Hub\Content;

defined( 'ABSPATH' ) || exit;

final class ProviderRegistry {
	private $providers = array();
	public function __construct() {
		$this->register( new OpenAiProvider() );
		do_action( 'npati_hub/ai/register_providers', $this ); }
	public function register( AiProviderInterface $provider ) {
		$this->providers[ $provider->id() ] = $provider; }
	public function get( $id = 'openai' ) {
		if ( empty( $this->providers[ $id ] ) ) {
			throw new \RuntimeException( esc_html__( 'AI provider is unavailable.', 'npati-content-automation' ) );
		} return $this->providers[ $id ]; }
	public function active() {
		foreach ( $this->providers as $provider ) {
			if ( $provider->is_connected() ) {
				return $provider;
			}
		} throw new \RuntimeException( esc_html__( 'Connect an AI provider before generating content.', 'npati-content-automation' ) ); }
}
