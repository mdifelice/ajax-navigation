export class Page {
	constructor( href, documentTitle, bodyClass, rootElement ) {
		this.key           = this.generateKey( href );
		this.documentTitle = documentTitle;
		this.bodyClass     = bodyClass;
		this.rootElement   = rootElement;
		this.timestamp     = new Date().now;

		this.updateScroll();
	}

	update() {
		this.documentTitle = document.title;

		this.updateScroll();
	}

	updateScroll() {
		this.scrollX = window.scrollX;
		this.scrollY = window.scrollY;
	}

	static generateKey( href ) {
		let key         = href.replace( document.location.origin, '' ),
			appendSlash = false;

		if ( key.length ) {
			if ( '/' !== key.charAt( key.length - 1 ) ) {
				appendSlash = true;
			}
		} else {
			appendSlash = true;
		}

		if ( appendSlash ) {
			key += '/';
		}

		return key;
	}

	static parseHTML( href, html, id = null ) {
		let parser        = new DOMParser(),
			document      = parser.parseFromString( html, 'text/html' ),
			documentTitle = document.title,
			bodyClass     = document.body.className,
			rootElement   = null,
			page          = null;

		if ( id ) {
			rootElement = document.getElementByID( id );
		} else {
			rootElement = document.body;
		}

		return new Page( href, documentTitle, bodyClass, rootElement );
	}
}
