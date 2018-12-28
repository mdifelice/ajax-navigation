import Container from './container';
import Events from './events';
import History from './history';
import Page from './page';

function filterAnchor( anchor ) {
	let target = anchor.getAttribute( 'target' ) || '',
		filter = true;

	if ( '_blank' !== target.toLowerCase() ) {
		filter = filterUrl( anchor );
	}

	return filter;
}

function filterUrl( url ) {
	let filter = true;

	if ( window.location.hostname === url.hostname ) {
		let pathName = url.pathname;

		if ( window.location.pathname !== pathName || ! url.hash ) {
			let blacklist = settings.urlBlacklist;

			filter = false;

			for ( let i in blacklist ) {
				let pattern = new RegExp( blacklist[ i ] );

				if ( pattern.test( pathName ) ) {
					filter = true;

					break;
				}
			}
		}
	}

	return filter;
}

function init() {
	var container = new Container( settings.containerId ),
		history   = new History();

	let currentPage = container.currentPage;

	history.setPage( currentPage );

	window.history.replaceState(
		{
			key: currentPage.key
		},
		currentPage.documentTitle,
		document.location.href
	);

	Events.live( 'a', 'click', function( e ) {
		let anchor = this;

		if ( ! filterAnchor( anchor ) ) {
			e.preventDefault();

			var bodyClassList = document.body.classList;

			// Avoid double fetching by checking this body class.
			if ( ! bodyClassList.contains( 'ajax-navigation-fetching' ) ) {
				bodyClassList.add( 'ajax-navigation-fetching' );

				var href = anchor.href;

				let key          = Page.generateKey( href ),
					page         = history.getPage( key ),
					cacheTimeout = settings.cacheTimeout;

				if ( page && ( ! cacheTimeout || Date.now() - page.timestamp <= cacheTimeout ) ) {
					container.render( page );
				} else {
					fetch( href ).then( ( response ) => {
						return response.text();
					} ).then( ( html ) => {
						let page = container.parsePage( href, html );

						bodyClassList.remove( 'ajax-navigation-fetching' );

						history.setPage( page );

						container.render( page );

						window.history.pushState(
							{
								key: page.key
							},
							page.documentTitle,
							href
						);
					} ).catch( () => {
						// In case of an error, it fallbacks in regular navigation.
						window.location.href = href;
					} );
				}
			}
		}
	} );

	// When the user goes back or forward, we retrieve the content from the queue
	window.addEventListener( 'popstate', ( e ) => {
		let key = e.state ? e.state.key : null;

		if ( key ) {
			container.render( history.getPage( key ) );
		}
	} );
}

if ( undefined !== window.ajaxNavigation ) {
	var settings = window.ajaxNavigation;

	let readyState = document.readyState;

	if ( 'complete' === readyState || 'interactive' === readyState ) {
		init();
	} else {
		document.addEventListener( 'DOMContentLoaded', init );
	}
}
