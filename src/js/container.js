export class Container {
	constructor( id ) {
		this.id          = id;
		this.rootElement = document.getElementById( id ) || document.body;
		this.currentPage = this.parsePage( href, document.title, document.body.className );
	}

	render( page ) {
		currentPage.update();

		document.title          = page.documentTitle;
		document.body.className = page.bodyClass;

		while ( page.rootElement.firstChild ) {
			this.rootElement.appendChild( page.rootElement.firstChild );
		}

		window.scrollTo( page.scrollX, page.scrollY );

		this.currentPage = page;
	}

	parsePage( href, html ) {
		let parser        = new DOMParser(),
			document      = parser.parseFromString( html, 'text/html' ),
			documentTitle = document.title,
			bodyClass     = document.body.className,
			rootElement   = null,
			page          = null;

		if ( id ) {
			rootElement = document.getElementByID( container.id );
		} else {
			rootElement = document.body;
		}

		return new Page( href, documentTitle, bodyClass, rootElement );
	}
}
