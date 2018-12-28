export default class History {
	constructor() {
		this.pages = {};
	}

	getPage( key ) {
		let page = null;

		if ( undefined !== this.pages[ key ] ) {
			page = this.pages[ key ];
		}

		return page;
	}

	setPage( page ) {
		this.pages[ page.key ] = page;
	}
}
