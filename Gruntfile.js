module.exports = function( grunt ) {
	grunt.initConfig( {
		pkg: grunt.file.readJSON( 'package.json' ),
		browserify: {
			dist: {
				options: {
					transform: [
						[ 'babelify' ]
					]
				},
				src: 'src/js/*.js',
				dest: 'public/js/<%= pkg.name %>.js'
			}
		},
	} );

	grunt.loadNpmTasks( 'grunt-browserify' );

	grunt.registerTask( 'default', [ 'browserify' ] );
};
