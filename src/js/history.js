import 'page.js';

export class History {
	constructor( cacheTimeout ) {
		this.cacheTimeout = cacheTimeout;
		this.pages        = {};
	}

	getPage( key ) {
		let possiblePage = this.pages[ key ],
			page         = null;

		if ( undefined !== possiblePage ) {
			if ( ! this.cacheTimeout || new Date().now - possiblePage.timestamp <= this.cacheTimeout ) {
				page = possiblePage;
			}
		}

		return page;
	}

	setPage( page ) {
		let currentPage = this.getPage( page.key );

		if ( currentPage ) {
			page.timestamp = new Date().now;
		}

		this.pages[ page.key ] = page;
	}
}
