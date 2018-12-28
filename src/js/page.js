export default class Page {
	constructor( href, documentTitle, bodyClass, rootElement ) {
		this.key           = Page.generateKey( href );
		this.documentTitle = documentTitle;
		this.bodyClass     = bodyClass;
		this.rootElement   = rootElement;
		this.timestamp     = Date.now();
	}

	update( containerRootElement ) {
		this.documentTitle = document.title;
		this.bodyClass     = document.body.className;
		this.scrollX       = window.scrollX;
		this.scrollY       = window.scrollY;

		while ( containerRootElement.firstChild ) {
			this.rootElement.appendChild( containerRootElement.firstChild );
		}
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
