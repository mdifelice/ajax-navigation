( function() {
	const events = require( './events.js' );

	var historyQueue = {};

	var filterAnchor = function( anchor ) {
		var filter = true;

		if ( window.location.hostname === anchor.hostname ) {
			let pathName = anchor.pathname;

			if ( window.location.pathname !== pathName || ! anchor.hash ) {
				let target = anchor.getAttribute( 'target' ).toLowerCase();

				if ( '_blank' !== target ) {
					filter = false;

					let blacklist = [
						/^\/wp-login\.php$/,
						/^\/wp-admin\//,
						/\/feed\/$/,
					];

					for ( let pattern of blacklist ) {
						if ( pattern.match( pathName ) ) {
							filter = true;

							break;
						}
					}
				}
			}
		}

		return filter;
	};

	var init = function() {
		var cacheTimeout = parseInt( settings.cache_timeout ) || 0;
		var container    = document.getElementById( settings.container_id ) || document.body;

		window.history.replaceState(
			{
				key: key(),
			},
			document.title,
			document.location.href
		);

		//setQueue( ... );

		events.live( 'click', 'a', function( e ) {
			if ( ! filterAnchor( this ) ) {
				e.preventDefault();
			}
		} );

		window.addEventListener( 'popstate', function( e ) {
			var key = e.state && e.state.key ? e.state.key : null;

			if ( key ) {
				setContent( key, false );
			}
		} );
	};

	if ( 'undefined' !== typeof window.ajax_navigation ) {
		var settings   = window.ajax_navigation;
		var readyState = document.readyState;

		if ( 'complete' === readyState || 'interactive' === readyState ) {
			init();
		} else {
			document.addEventListener( 'DOMContentLoaded', init );
		}
	}
} )();
