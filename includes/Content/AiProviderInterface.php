<?php
namespace NPATI\Hub\Content;

defined( 'ABSPATH' ) || exit;

interface AiProviderInterface {
	public function id();
	public function is_connected();
	public function models( $api_key = '' );
	public function test( $api_key, $model = '' );
	public function connect( $api_key, $model );
	public function disconnect();
	public function generate_article( array $task );
	public function generate_social_post( array $article );
}
