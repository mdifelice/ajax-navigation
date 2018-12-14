module.exports = {
	on: function( selector, eventName, callback, container ) {
		var container = container || document;
		var elements = container.querySelectorAll( selector );

		elements.forEach( function( element ) {
			element.addEventListener( eventName, callback );
		} );
	},
	live: function( selector, eventName, callback ) {
		this.on( selector, eventName, callback );

		if ( window.MutationObserver ) {
			var mutationObserver = new MutationObserver( function( mutations ) {
				mutations.forEach( function( mutation ) {
					if ( 'childList' === mutation.type ) {
						mutation.addedNodes.forEach( function( node ) {
							if ( node.matches && node.matches( selector ) ) {
								node.addEventListener( eventName, callback );
							} else if ( node.querySelectorAll ) {
								this.on( selector, eventName, callback, node );
							}
						}.bind( this ) );
					}
				}.bind( this ) );
			}.bind( this ) );

			mutationObserver.observe( document.body, {
				childList: true,
				subtree: true
			} );
		}
	}
};
