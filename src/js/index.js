import * as events from './events';

( function() {
	let historyQueue = {};

	let filterAnchor = ( anchor ) => {
		let filter = true;

		if ( window.location.hostname === anchor.hostname ) {
			let pathName = anchor.pathname;

			if ( window.location.pathname !== pathName || ! anchor.hash ) {
				let target = anchor.getAttribute( 'target' ) || '';

				if ( '_blank' !== target.toLowerCase() ) {
					filter = false;

					let blacklist = [
						/^\/wp-login\.php$/,
						/^\/wp-admin\/?/,
						/\/feed\/?$/,
					];

					for ( let i in blacklist ) {
						let pattern = blacklist[ i ];

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

	let init = () => {
		let cacheTimeout = parseInt( settings.cache_timeout ) || 0;
		let container    = document.getElementById( settings.container_id ) || document.body;

		window.history.replaceState(
			{
				key: document.location.href,
			},
			document.title,
			document.location.href
		);

		//setQueue( ... );

		events.live( 'a', 'click', ( e ) => {
			let anchor = this;

			if ( ! filterAnchor( anchor ) ) {
				e.preventDefault();

				if ( ! document.body.classList.contains( 'ajax-navigation-fetching' ) ) {
					document.body.classList.add( 'ajax-navigation-fetching' );

					let url = anchor.href;

					fetch( url ).then( ( response ) => {
						setContent( key );
					} ).catch( () => {
						window.location.href = url;
					} );
				}
			}
		} );

		window.addEventListener( 'popstate', ( e ) => {
			let key = e.state && e.state.key ? e.state.key : null;

			if ( key ) {
				setContent( key, false );
			}
		} );
	};

	if ( 'undefined' !== typeof window.ajax_navigation ) {
		let settings   = window.ajax_navigation;
		let readyState = document.readyState;

		if ( 'complete' === readyState || 'interactive' === readyState ) {
			init();
		} else {
			document.addEventListener( 'DOMContentLoaded', init );
		}
	}
} )();
