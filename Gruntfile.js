module.exports = function(grunt){

	// modules calls
	grunt.loadNpmTasks('grunt-contrib-connect'); // levantar servidores
	grunt.loadNpmTasks('grunt-contrib-stylus'); // compilar stylus
	grunt.loadNpmTasks('grunt-contrib-watch'); // observar cambios sobre archivos
	grunt.loadNpmTasks('grunt-contrib-cssmin'); // minificar los css
	grunt.loadNpmTasks('grunt-contrib-uglify'); // minificar js
	grunt.loadNpmTasks('grunt-contrib-stylus'); // stylus

	// config modules
	grunt.config.init({

		connect: { // lanza servidor

		    server: {

		     	options: {
			        hostname: 'www',
			        port:8080,
	                livereload: true,
	                open: true,
	                base: 'src/public',
		    	}
			}
		},

		watch: { // observa cambios sobre archivos

			scripts: {
			   	files: ['src/public/**/*', '!src/public/css/*'],
			   	tasks: ['stylus'],
			   	options: {
			        livereload: true,
			    },

			}

		},


		cssmin: { // minificado de css
		  target: {
		    files: [{
		      expand: true,
		      cwd: 'css/',
		      src: ['*.css', '!*.min.css'],
		      dest: 'css/',
		      ext: '.min.css'
		    }]
		  }
		},

	    uglify: { // minificador de js
	      options: {
	        mangle: true
	      },
	      my_target: {
	        files: {
	          'js/main.min.js': ['js/main.js']
	        }
	      }
	    },


	    stylus: {
		  compile: {
		    options: {
		      paths: ['src/public/stylus'],
		    },
		    files: {
		      'src/public/css/style.css': ['src/public/stylus/style.styl']
		    }
		  }
		}

	});

	// tareas
	grunt.registerTask('default',['stylus','connect:server','watch:scripts']);

	grunt.task.registerTask('genstylus', ['stylus']);


};