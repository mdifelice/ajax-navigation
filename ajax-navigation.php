<?php
/**
 * Plugin Name: AJAX Navigation
 */

add_action( 'init', function() {
	load_theme_textdomain( 'ajax-navigation', __DIR__ . '/languages' );
} );

add_action( 'admin_menu', function() {
	add_theme_page(
		__( 'AJAX Navigation', 'ajax-navigation' ),
		__( 'AJAX Navigation', 'ajax-navigation' ),
		'switch_themes',
		'ajax-navigation',
		function() {
			?>
<div class="wrap">
	<h1><?php esc_html_e( 'AJAX Navigation', 'ajax-navigation' ); ?></h1>
	<form method="post" action="options.php">
			<?php
			settings_fields( 'ajax-navigation' );
			do_settings_sections( 'ajax-navigation' );
			submit_button();
			?>
	</form>
</div>
			<?php
		}
	);
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
				checked( 'yes', get_option( 'ajax_navigation_enabled' ), false )
			);
		},
		'ajax-navigation',
		'ajax-navigation'
	);

	add_settings_field(
		'ajax_navigation_cache_timeout',
		__( 'Cache timeout', 'ajax-navigation' ),
		function() {
			printf(
				'<input type="number" class="widefat" name="ajax_navigation_cache_timeout" value="%s" />',
				esc_attr( get_option( 'ajax_navigation_cache_timeout' ) )
			);
		},
		'ajax-navigation',
		'ajax-navigation'
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
	}
} );

add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), function( $links ) {
	$links[] = sprintf(
		'<a href="%s">%s</a>',
		esc_attr( admin_url( 'themes.php?page=ajax-navigation' ) ),
		esc_html__( 'Settings', 'ajax-navigation' )
	);

	return $links;
} );
