const path = require( 'path' );

module.exports = {
	entry: [ './js/src/index.js' ],
	output: {
		filename: './js/ajax-navigation.min.js',
		path: path.resolve( __dirname )
	},
	//mode: 'production'
	mode: 'development'
};
