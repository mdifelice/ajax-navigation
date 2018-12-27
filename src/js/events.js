export default class Events {
	static on( selector, eventName, callback, container ) {
		container = container || document;

		let elements = container.querySelectorAll( selector );

		elements.forEach( ( element ) => {
			element.addEventListener( eventName, callback );
		} );
	}

	static live( selector, eventName, callback ) {
		this.on( selector, eventName, callback );

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
}
