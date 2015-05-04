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
	grunt.loadNpmTasks('grunt-contrib-copy'); // copia archivos y carpetas
	grunt.loadNpmTasks('grunt-contrib-clean'); // borra carpetas y archivos


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
	                base: 'src/dev',
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
			   	files: ['src/dev/**/*', '!src/dev/css/*', '!src/dev/js/app.js', '!src/dev/js/app.min.js'],
			   	tasks: ['stylus', 'browserify'],
			   	options: {
			        livereload: true,
			    },

			}

		},

		browserify: { // gestión de dependencias js
      		'src/dev/js/app.min.js': ['src/dev/js/main.js']
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
	          'src/dev/js/app.min.js': ['src/dev/js/app.min.js']
	        }
	      }
	    },


	    stylus: { // compilación stylus
		  compile: {
		    options: {
		      paths: ['src/dev/stylus'],
		    },
		    files: {
		      'src/dev/css/style.min.css': ['src/dev/stylus/style.styl']
		    }
		  }
		},

		copy: {
		  main: {
		    files: [
		      // includes files within path
		      {expand: true, flatten: true, src: ['src/dev/css/**'], dest: 'build/css', filter: 'isFile'},
		      {expand: true, flatten: true, src: ['src/dev/js/app.min.js'], dest: 'build/js', filter: 'isFile'},
		      {expand: true, flatten: true, src: ['src/dev/index.html'], dest: 'build', filter: 'isFile'},
		      {expand: true, flatten: true, src: ['src/dev/.htaccess'], dest: 'build', filter: 'isFile'},
		      {expand: true, flatten: true, src: ['src/dev/api/.htaccess'], dest: 'build/api', filter: 'isFile'},
		      {expand: true, flatten: true, src: ['src/dev/api/**'], dest: 'build/api', filter: 'isFile'},
		      {expand: true, flatten: true, src: ['src/dev/img/**'], dest: 'build/img', filter: 'isFile'},
		    ],
		  },
		},

		clean: ["build"]

	});

	// tareas
	grunt.registerTask('default',[ 'stylus' , 'browserify' , 'open:dev' , 'watch:scripts' ]);

	grunt.task.registerTask('genstylus', ['stylus']);

	grunt.task.registerTask('build', [ 'clean', 'stylus' , 'browserify' , 'uglify' , 'copy' ]);

	grunt.task.registerTask('borrar', [ 'clean' ]);


};