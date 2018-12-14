module.exports = function( grunt ) {
	grunt.initConfig( {
		pkg: grunt.file.readJSON( 'package.json' ),
		concat: {
			dist: {
				src: 'src/js/*.js',
				dest: 'public/js/<%= pkg.name %>.js'
			}
		},
		uglify: {
			dist: {
				files: {
					'public/js/<%= pkg.name %>.min.js' : [ '<%= concat.dist.dest %>' ]
				}
			}
		}
	} );

	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );

	grunt.registerTask( 'default', [ 'concat', 'uglify' ] );
};
