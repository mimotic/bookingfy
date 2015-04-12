module.exports = function(grunt){

	// modules calls
	grunt.loadNpmTasks('grunt-contrib-connect'); // levantar servidores
	grunt.loadNpmTasks('grunt-browserify'); // inyección de dependencias backbone
	grunt.loadNpmTasks('grunt-contrib-stylus'); // compilar stylus
	grunt.loadNpmTasks('grunt-contrib-watch'); // observar cambios sobre archivos
	grunt.loadNpmTasks('grunt-contrib-cssmin'); // minificar los css
	grunt.loadNpmTasks('grunt-contrib-uglify'); // minificar js
	grunt.loadNpmTasks('grunt-contrib-stylus'); // stylus
	grunt.loadNpmTasks('grunt-open'); // open url

	// load module reescritura de urls para el server
	modRewrite = require('connect-modrewrite')

	// config modules
	grunt.config.init({

		open: { // abre url en el navegador especificado
		    dev: {
		      path: 'http://bookingfy.dev/',
		      app: 'Google Chrome',
		      options: {
		      	livereload: true
		      }
		    }
		},

		connect: { // lanza servidor

		    server: {

		     	options: {
			        hostname: 'bookingfy.dev',
			        port:80,
	                livereload: true,
	                open: true,
	                base: 'src/public',
	                middleware: function(connect, options) { // reescritura urls
				        var middlewares;
				        middlewares = [];
				        middlewares.push(modRewrite(['^[^\\.]*$ /index.html [L]']));
				        options.base.forEach(function(base) {
				          return middlewares.push(connect["static"](base));
				        });
				        return middlewares;
				    }
		    	}
			}
		},

		watch: { // observa cambios sobre archivos

			scripts: {
			   	files: ['src/public/**/*', '!src/public/css/*'],
			   	tasks: ['stylus', 'browserify'],
			   	options: {
			        livereload: true,
			    },

			}

		},

		browserify: {
      		'src/public/js/app.js': ['src/public/js/main.js']
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
	grunt.registerTask('default',['stylus','browserify','open:dev','watch:scripts']);

	grunt.task.registerTask('genstylus', ['stylus']);


};