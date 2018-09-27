<?php
/**
 * Plugin Name: AJAX Navigation
 */

add_action( 'init', function() {
	load_theme_textdomain( 'ajax-navigation', __DIR__ . '/languages' );
} );

add_action( 'admin_init', function() {
	add_settings_section(
		'ajax-navigation',
		__( 'Settings', 'ajax-navigation' ),
		null,
		'ajax-navigation'
	);

	add_settings_field(
		'ajax_navigation_enabled',
		__( 'Enabled?', 'ajax-navigation' ),
		function() {
			printf(
				'<input type="checkbox" name="ajax_navigation_enabled" value="yes"%s />',
				checked( 'yes', get_option( 'ajax_navigation_enabled' ) )
			);
		},
		'ajax-navigation',
		'ajax-navigation',
	);

	add_settings_field(
		'ajax_navigation_cache_timeout',
		__( 'Cache timeout', 'ajax-navigation' ),
		function() {
			printf(
				'<input type="number" name="ajax_navigation_cache_timeout" value="%s" />',
				esc_attr( get_option( 'ajax_navigation_cache_timeout' ) )
			);
		},
		'ajax-navigation',
		'ajax-navigation',
	);

	register_setting(
		'ajax-navigation',
		'ajax_navigation_enabled',
		function( $value ) {
			return 'yes' === $value ? 'yes' : 'no';
		}
	);

	register_setting(
		'ajax-navigation',
		'ajax_navigation_cache_timeout',
		'absint'
	);
} );

add_action( 'wp_enqueue_scripts', function() {
	$enabled = get_option( 'ajax_navigation_enabled' );

	if ( 'yes' === $enabled ) {
		$cache_timeout = get_option( 'ajax_navigation_cache_timeout', 0 );

		wp_enqueue_script(
			'ajax-navigation',
			plugins_url( 'assets/js/ajax-navigation.min.js', __FILE__ ),
			array(),
			'1.0',
			true
		);

		wp_localize_script(
			'ajax-navigation',
			'ajax_navigation',
			array(
				'cache_timeout' => $cache_timeout,
			)
		);
} );
