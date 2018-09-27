module.exports = {
	delegateEvent: function( eventName, selector, listener ) {
		var elements = document.querySelectorAll( selector );
		var callback = function( e ) {
			if ( listener.bind ) {
				( listener.bind( this ) )( e );
			}
		};

		elements.forEach( function( element ) {
			element.addEventListener( eventName, callback );
		} );

		if ( window.MutationObserver ) {
			var mutationObserver = new MutationObserver( function( mutations ) {
				mutations.forEach( function( mutation ) {
					if ( 'childList' === mutation.type ) {
						mutation.addedNodes.forEach( function( node ) {
							if ( node.matches && node.matches( selector ) ) {
								node.addEventListener( eventName, callback );
							} else if( node.querySelectorAll ) {
								var elements = node.querySelectorAll( selector );

								elements.forEach( function( element ) {
									element.addEventListener( eventName, callback );
								} );
							}
						} );
					}
				} );
			} );

			mutationObserver.observe( document.body, { childList: true, subtree: true } );
		}
	}
};
