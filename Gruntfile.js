module.exports = function( grunt ) {
	grunt.initConfig( {
		pkg: grunt.file.readJSON( 'package.json' ),
		concat: {
			dist: {
				src: 'src/js/*.js',
				dest: 'public/js/<%= pkg.name %>.js'
			}
		},
		babel: {
			dist: {
				src: 'public/js/<%= pkg.name %>.js',
				dest: 'public/js/<%= pkg.name %>.js'
			}
		},
		uglify: {
			dist: {
				src: 'public/js/<%= pkg.name %>.js',
				dest: 'public/js/<%= pkg.name %>.min.js'
			}
		}
	} );

	grunt.loadNpmTasks( 'grunt-babel' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );

	grunt.registerTask( 'default', [ 'concat', 'babel', 'uglify' ] );
};
