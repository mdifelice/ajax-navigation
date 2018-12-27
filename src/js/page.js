export default class Page {
	constructor( href, documentTitle, bodyClass, rootElement ) {
		this.key           = Page.generateKey( href );
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
}
