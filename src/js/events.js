export function on( selector, eventName, callback, container ) {
	let elements = container.querySelectorAll( selector );

	container = container || document;

	elements.forEach( ( element ) => {
		element.addEventListener( eventName, callback );
	} );
}

export function live( selector, eventName, callback ) {
	on( selector, eventName, callback );

	if ( window.MutationObserver ) {
		let mutationObserver = new MutationObserver( ( mutations ) => {
			mutations.forEach( ( mutation ) => {
				if ( 'childList' === mutation.type ) {
					mutation.addedNodes.forEach( ( node ) => {
						if ( node.matches && node.matches( selector ) ) {
							node.addEventListener( eventName, callback );
						} else if ( node.querySelectorAll ) {
							this.on( selector, eventName, callback, node );
						}
					} );
				}
			} );
		} );

		mutationObserver.observe( document.body, {
			childList: true,
			subtree: true
		} );
	}
}
