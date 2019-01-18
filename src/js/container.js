import Page from './page';

export default class Container {
	constructor( id ) {
		this.id          = id;
		this.rootElement = document.getElementById( id ) || document.body;
		this.currentPage = this.parsePage( document.location.href, '' );
	}

	render( page ) {
		this.currentPage.update( this.rootElement );

		document.title          = page.documentTitle;
		document.body.className = page.bodyClass;

		while ( page.rootElement.firstChild ) {
			this.rootElement.appendChild( page.rootElement.firstChild );
		}

		/**
		 * Given there is some asynchronous processing when appending elements
		 * the scrolling functionality will not work if executed just after
		 * adding them. It is setup a timeout of 10 milliseconds (enough for
		 * completing that processing) while does not appear a better solution.
		 *
		 * @todo
		 */
		setTimeout(
			() => {
				window.scrollTo( page.scrollX, page.scrollY );
			},
			10
		);

		this.currentPage = page;
	}

	parsePage( href, html ) {
		let parser        = new DOMParser(),
			document      = parser.parseFromString( html, 'text/html' ),
			documentTitle = document.title,
			bodyClass     = document.body.className,
			rootElement   = null,
			page          = null;

		if ( this.id ) {
			rootElement = document.getElementByID( this.id );
		} else {
			rootElement = document.body;
		}

		return new Page( href, documentTitle, bodyClass, rootElement );
	}
}
