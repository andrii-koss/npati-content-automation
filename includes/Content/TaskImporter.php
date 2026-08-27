<?php
namespace NPATI\Hub\Content;

defined( 'ABSPATH' ) || exit;

final class TaskImporter {
	const MAX_BYTES = 5242880;
	const MAX_ROWS  = 5000;

	public function import( array $file ) {
		if ( empty( $file['tmp_name'] ) || ! is_uploaded_file( $file['tmp_name'] ) ) {
			throw new \InvalidArgumentException( esc_html__( 'Choose a CSV or XLSX file.', 'npati-content-automation' ) ); }
		if ( (int) ( $file['size'] ?? 0 ) > self::MAX_BYTES ) {
			throw new \InvalidArgumentException( esc_html__( 'Import file must be 5 MB or smaller.', 'npati-content-automation' ) ); }
		$extension = strtolower( pathinfo( sanitize_file_name( (string) ( $file['name'] ?? '' ) ), PATHINFO_EXTENSION ) );
		if ( ! in_array( $extension, array( 'csv', 'xlsx' ), true ) ) {
			throw new \InvalidArgumentException( esc_html__( 'Only CSV and XLSX files are supported.', 'npati-content-automation' ) ); }
		$rows = 'csv' === $extension ? $this->csv( $file['tmp_name'] ) : $this->xlsx( $file['tmp_name'] );
		if ( count( $rows ) < 2 ) {
			throw new \InvalidArgumentException( esc_html__( 'The file does not contain content tasks.', 'npati-content-automation' ) ); }
		$headers = array_map( array( $this, 'header' ), array_shift( $rows ) );
		$tasks   = array();
		foreach ( array_slice( $rows, 0, self::MAX_ROWS ) as $index => $row ) {
			$data = array();
			foreach ( $headers as $column => $key ) {
				if ( $key ) {
					$data[ $key ] = isset( $row[ $column ] ) ? trim( (string) $row[ $column ] ) : ''; }
			}
			if ( '' === ( $data['title'] ?? '' ) && '' === ( $data['description'] ?? '' ) ) {
				continue; }
			$data['keywords'] = array_values( array_filter( array_map( 'trim', preg_split( '/[,;|]/', (string) ( $data['keywords'] ?? '' ) ) ) ) );
			if ( isset( $data['publish_date'] ) && is_numeric( $data['publish_date'] ) ) {
				$data['publish_date'] = gmdate( 'Y-m-d', ( (int) $data['publish_date'] - 25569 ) * DAY_IN_SECONDS ); }
			if ( isset( $data['publish_time'] ) && is_numeric( $data['publish_time'] ) ) {
				$data['publish_time'] = gmdate( 'H:i', (int) round( (float) $data['publish_time'] * DAY_IN_SECONDS ) ); }
			$data['image_attachment_id'] = absint( $data['image'] ?? 0 );
			$data['row']                 = $index + 2;
			$tasks[]                     = $data;
		}
		$token = strtolower( wp_generate_password( 24, false, false ) );
		set_transient( 'npati_content_import_' . get_current_user_id() . '_' . $token, $tasks, 2 * HOUR_IN_SECONDS );
		return array(
			'token'     => $token,
			'total'     => count( $tasks ),
			'limit'     => self::MAX_ROWS,
			'truncated' => count( $rows ) > self::MAX_ROWS,
			'items'     => array_slice( $tasks, 0, 100 ),
		);
	}

	public function page( $token, $offset = 0 ) {
		$tasks = get_transient( 'npati_content_import_' . get_current_user_id() . '_' . sanitize_key( $token ) );
		if ( ! is_array( $tasks ) ) {
			throw new \RuntimeException( esc_html__( 'Import preview expired. Upload the file again.', 'npati-content-automation' ) ); }
		return array(
			'token'  => $token,
			'total'  => count( $tasks ),
			'offset' => max( 0, absint( $offset ) ),
			'items'  => array_slice( $tasks, max( 0, absint( $offset ) ), 100 ),
		);
	}

	public function clear( $token ) {
		delete_transient( 'npati_content_import_' . get_current_user_id() . '_' . sanitize_key( $token ) ); }

	public function header( $value ) {
		$key = strtolower( trim( preg_replace( '/\s+/', ' ', (string) $value ) ) );
		$map = array(
			'title'        => 'title',
			'description'  => 'description',
			'keywords'     => 'keywords',
			'category'     => 'category',
			'publish date' => 'publish_date',
			'publish time' => 'publish_time',
			'image'        => 'image',
			'social post'  => 'social_post',
		);
		return $map[ $key ] ?? ''; }
	private function csv( $path ) {
		// fgetcsv() requires a stream; the path is accepted only after is_uploaded_file() succeeds.
		// phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_fopen -- WP_Filesystem has no streaming CSV parser.
		$handle = fopen( $path, 'rb' );
		if ( ! $handle ) {
			throw new \RuntimeException( esc_html__( 'Unable to read the CSV file.', 'npati-content-automation' ) ); }
		$first = fgets( $handle );
		rewind( $handle );
		$delimiter = substr_count( (string) $first, ';' ) > substr_count( (string) $first, ',' ) ? ';' : ',';
		$rows      = array();
		while ( false !== ( $row = fgetcsv( $handle, 0, $delimiter ) ) ) {
			$rows[] = $row;
			if ( count( $rows ) > self::MAX_ROWS + 1 ) {
				break; }
		}
		// phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_fclose -- Closes the verified upload stream opened above.
		fclose( $handle );
		if ( isset( $rows[0][0] ) ) {
			$rows[0][0] = preg_replace( '/^\xEF\xBB\xBF/', '', $rows[0][0] ); }
		return $rows;
	}
	private function xlsx( $path ) {
		if ( ! class_exists( 'ZipArchive' ) ) {
			throw new \RuntimeException( esc_html__( 'The PHP Zip extension is required for XLSX imports.', 'npati-content-automation' ) ); }
		$zip = new \ZipArchive();
		if ( true !== $zip->open( $path ) ) {
			throw new \RuntimeException( esc_html__( 'Unable to open the XLSX file.', 'npati-content-automation' ) ); }
		$shared     = array();
		$shared_xml = $zip->getFromName( 'xl/sharedStrings.xml' );
		if ( $shared_xml ) {
			$xml = simplexml_load_string( $shared_xml );
			if ( $xml ) {
				foreach ( $xml->si as $si ) {
					$parts = array();
					foreach ( $si->xpath( './/t' ) as $text ) {
						$parts[] = (string) $text;
					} $shared[] = implode( '', $parts ); }
			}
		}
		$sheet_xml = $zip->getFromName( 'xl/worksheets/sheet1.xml' );
		$zip->close();
		if ( ! $sheet_xml ) {
			throw new \RuntimeException( esc_html__( 'The first XLSX worksheet is missing.', 'npati-content-automation' ) ); }
		$xml = simplexml_load_string( $sheet_xml );
		if ( ! $xml ) {
			throw new \RuntimeException( esc_html__( 'The XLSX worksheet is invalid.', 'npati-content-automation' ) );
		} $rows = array();
		foreach ( $xml->sheetData->row as $row ) {
			$values = array();
			foreach ( $row->c as $cell ) {
				$ref = (string) $cell['r'];
				preg_match( '/^[A-Z]+/', $ref, $match );
				$column            = $this->column_index( $match[0] ?? 'A' );
				$value             = 's' === (string) $cell['t'] ? ( $shared[ (int) $cell->v ] ?? '' ) : ( 'inlineStr' === (string) $cell['t'] ? (string) $cell->is->t : (string) $cell->v );
				$values[ $column ] = $value; } if ( $values ) {
				for ( $i = 0; $i <= max( array_keys( $values ) ); $i++ ) {
					$values[ $i ] = $values[ $i ] ?? '';
				} ksort( $values );
				$rows[] = array_values( $values );
				} if ( count( $rows ) > self::MAX_ROWS + 1 ) {
					break; }
		}
		return $rows;
	}
	private function column_index( $letters ) {
		$index = 0;
		foreach ( str_split( $letters ) as $letter ) {
			$index = $index * 26 + ord( $letter ) - 64;
		} return max( 0, $index - 1 ); }
}
