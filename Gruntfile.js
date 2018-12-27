module.exports = function( grunt ) {
	grunt.initConfig( {
		pkg: grunt.file.readJSON( 'package.json' ),
		babel: {
			options: {
				presets: [ '@babel/preset-env' ]
			},
			dist: {
				expand: true,
				src: 'src/js/*.js',
				dest: 'tmp'
			}
		},
		browserify: {
			dist: {
				src: 'tmp/src/js/index.js',
				dest: 'public/js/<%= pkg.name %>.js'
			}
		},
		uglify: {
			dist: {
				src: 'public/js/<%= pkg.name %>.js',
				dest: 'public/js/<%= pkg.name %>.min.js'
			}
		},
		makepot: {
			target: {
				options: {
					type: 'wp-plugin'
				}
			}
		},
		sass: {
			dist: {
				options: {
					style: 'compressed',
				},
				src: 'src/sass/index.scss',
				dest: 'public/css/<%= pkg.name %>.min.css'
			}
		},
		clean: [ 'tmp' ]
	} );

	grunt.loadNpmTasks( 'grunt-babel' );
	grunt.loadNpmTasks( 'grunt-browserify' );
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	grunt.loadNpmTasks( 'grunt-wp-i18n' );

	grunt.registerTask( 'default', [ 'babel', 'browserify', 'uglify', 'makepot', 'sass', 'clean' ] );
};
