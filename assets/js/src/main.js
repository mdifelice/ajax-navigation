( function() {
	require( './event.js' );

	var init = function() {
		var cacheTimeout = parseInt( ajax_navigation.cache_timeout ) || 0;
		var container    = document.body;
		var currentKey   = getKey( document.location.href );

		window.history.replaceState(
			{
				key: currentKey,
			},
			document.title,
			document.location.href
		);

		//setQueue( ... );

		event.delegateEvent( 'click', 'a', function( e ) {
		} );

		window.addEventListener( 'popstate', function( e ) {
			var key = e.state && e.state.key ? e.state.key : null;

			if ( key ) {
				setContent( key, false );
			}
		} );
	};

	if ( 'undefined' !== typeof window.history.pushState() &&
	     'undefined' !== typeof window.ajax_navigation ) {
		if ( 'complete' === document.readyState || 'interactive' === document.readyState ) {
			init();
		} else {
			document.addEventListener( 'DOMContentLoaded', init );
		}
	}
} )();
