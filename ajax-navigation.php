<?php
/**
 * Plugin Name: AJAX Navigation
 * Description: @todo
 * Author: Martín Di Felice
 * Text Domain: ajax-navigation
 * Domain Path: /languages
 * Version: 1.0
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
		'ajax-navigation-default',
		__( 'Default Settings', 'ajax-navigation' ),
		null,
		'ajax-navigation'
	);

	add_settings_section(
		'ajax-navigation-advanced',
		__( 'Advanced Settings', 'ajax-navigation' ),
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
		'ajax-navigation-default'
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
		'ajax-navigation-advanced'
	);

	add_settings_field(
		'ajax_navigation_container_id',
		__( 'Container ID', 'ajax-navigation' ),
		function() {
			printf(
				'<input type="text" class="widefat" name="ajax_navigation_container_id" value="%s" />',
				esc_attr( get_option( 'ajax_navigation_container_id' ) )
			);
		},
		'ajax-navigation',
		'ajax-navigation-advanced'
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

	register_setting(
		'ajax-navigation',
		'ajax_navigation_container_id'
	);
} );

add_action( 'wp_enqueue_scripts', function() {
	$enabled = get_option( 'ajax_navigation_enabled' );

	if ( 'yes' === $enabled ) {
		$cache_timeout = get_option( 'ajax_navigation_cache_timeout', 0 );

		wp_enqueue_script(
			'ajax-navigation',
			plugins_url( 'public/js/ajax-navigation.min.js', __FILE__ ),
			array(),
			'1.0',
			true
		);

		wp_localize_script(
			'ajax-navigation',
			'ajaxNavigation',
			array(
				'containerId'  => null,
				'cacheTimeout' => $cache_timeout,
				'urlBlacklist' => array(
					'/^\/wp-login.php$/',
					'/^\/wp-admin\/?/',
					'/^\/feed\/?$/',
				),
			)
		);

		wp_enqueue_style(
			'ajax-navigation',
			plugins_url( 'public/css/ajax-navigation.min.css', __FILE__ ),
			array(),
			'1.0'
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
