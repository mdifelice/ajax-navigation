( function() {
	const events = require( './events.js' );

	var historyQueue = {};

	var filterAnchor = function( anchor ) {
		var filter = true;

		if ( window.location.hostname === anchor.hostname ) {
			var pathName = anchor.pathname;

			if ( window.location.pathname !== pathName || ! anchor.hash ) {
				var target = anchor.getAttribute( 'target' ) || '';

				if ( '_blank' !== target.toLowerCase() ) {
					filter = false;

					var blacklist = [
						/^\/wp-login\.php$/,
						/^\/wp-admin\/?/,
						/\/feed\/?$/,
					];

					for ( var i in blacklist ) {
						var pattern = blacklist[ i ];

						if ( pattern.test( pathName ) ) {
							console.log(1);
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
				key: document.location.href,
			},
			document.title,
			document.location.href
		);

		//setQueue( ... );

		events.live( 'a', 'click', function( e ) {
			var anchor = this;

			if ( ! filterAnchor( anchor ) ) {
				e.preventDefault();

				if ( ! document.body.classList.contains( 'ajax-navigation-fetching' ) ) {
					document.body.classList.add( 'ajax-navigation-fetching' );

					var url = anchor.href;

					fetch( url ).then( function( response ) {
						setContent( key );
					} ).catch( function() {
						window.location.href = url;
					} );
				}
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
