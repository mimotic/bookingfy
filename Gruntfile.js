module.exports = function(grunt){

	// modules calls
	grunt.loadNpmTasks('grunt-contrib-connect'); // levantar servidores
	grunt.loadNpmTasks('grunt-browserify'); // inyección de dependencias backbone
	grunt.loadNpmTasks('grunt-contrib-stylus'); // compilar stylus
	grunt.loadNpmTasks('grunt-contrib-watch'); // observar cambios sobre archivos
	grunt.loadNpmTasks('grunt-contrib-cssmin'); // minificar los css
	grunt.loadNpmTasks('grunt-contrib-uglify'); // minificar y ofuscar js
	grunt.loadNpmTasks('grunt-contrib-stylus'); // stylus
	grunt.loadNpmTasks('grunt-open'); // open url
	grunt.loadNpmTasks('grunt-contrib-copy'); // copia archivos y carpetas
	grunt.loadNpmTasks('grunt-contrib-clean'); // borra carpetas y archivos
	grunt.loadNpmTasks('grunt-ssh'); // conexión por ssh y sftp al servidor para deploy
	grunt.loadNpmTasks('grunt-changelog'); // coge el log de git to file
	grunt.loadNpmTasks('grunt-replace'); // replace strings pattern/regex


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
		    },
		    pro: {
		      path: 'http://pfc.ilopezchamorro.com/',
		      app: 'Google Chrome'
		    },

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
			   	tasks: ['clean:dev','stylus', 'browserify','copy:dev','replace:dev'],
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
		    files: {
		      'src/dev/css/style.min.css': ['src/dev/stylus/style.styl']
		    }
		  }
		},

		copy: {
		  pro: {
		    files: [
		      // includes files within path
		      {expand: true, flatten: true, src: ['src/dev/css/**'], dest: 'build/css', filter: 'isFile'},
		      {expand: true, flatten: true, src: ['src/dev/js/app.min.js'], dest: 'build/js', filter: 'isFile'},
		      {expand: true, flatten: true, src: ['src/dev/index.html'], dest: 'build', filter: 'isFile'},
		      {expand: true, flatten: true, src: ['src/dev/.htaccess'], dest: 'build', filter: 'isFile'},
		      {expand: true, flatten: true, src: ['src/dev/api/.htaccess'], dest: 'build/api', filter: 'isFile'},
		      {expand: true, flatten: true, src: ['src/dev/api/**'], dest: 'build/api', filter: 'isFile'},
		      {expand: true, flatten: true, src: ['src/dev/img/**'], dest: 'build/img', filter: 'isFile'},
		      {expand: true, flatten: true, src: ['src/dev/font/**'], dest: 'build/font', filter: 'isFile'},
		    ],
		  },
		  dev: {
		    files: [
		      // includes files within path
		      {expand: true, flatten: true, src: ['src/dev/css/**'], dest: 'dev/css', filter: 'isFile'},
		      {expand: true, flatten: true, src: ['src/dev/js/app.min.js'], dest: 'dev/js', filter: 'isFile'},
		      {expand: true, flatten: true, src: ['src/dev/index.html'], dest: 'dev', filter: 'isFile'},
		      {expand: true, flatten: true, src: ['src/dev/.htaccess'], dest: 'dev', filter: 'isFile'},
		      {expand: true, flatten: true, src: ['src/dev/api/.htaccess'], dest: 'dev/api', filter: 'isFile'},
		      {expand: true, flatten: true, src: ['src/dev/api/**'], dest: 'dev/api', filter: 'isFile'},
		      {expand: true, flatten: true, src: ['src/dev/img/**'], dest: 'dev/img', filter: 'isFile'},
		      {expand: true, flatten: true, src: ['src/dev/font/**'], dest: 'dev/font', filter: 'isFile'},
		    ],
		  },
		},

		clean: {
			dev: ["dev"],
			pro: ["build"]
		}, // borra la carpeta build antes de montarla

		secret: grunt.file.readJSON('secret.json'), // trae credenciales del secret.json
													// rellenar secret.json.example y guardar como secret.json
													// SEGURIDAD: nunca versionar este archivo o la seguridad se verá comprometida

		sftp: {
		  test: {
		    files: {
		      "./": "build/**", // todo lo que esté en build
		      "./.htaccess": "build/.htaccess" ,// forzamos los archivos ocultos
		      "./api/.htaccess": "build/api/.htaccess" // forzamos los archivos ocultos
		    },
		    options: {
		      dot: true,
		      srcBasePath: 'build/',
		      host: '<%= secret.sftp.host %>',
		      username: '<%= secret.sftp.username %>',
		      password: '<%= secret.sftp.password %>',
		      showProgress: true,
		      createDirectories: true
		    }
		  }
		},

		changelog: {
		    sample: {
		      options: {
		      	after: '2013-03-01',
		        logArguments: [
		          '--pretty=* %h - %ad: %s',
		          '--no-merges',
		          '--date=short'
		        ],
		        template: '{{> features}}',
		        featureRegex: /^(.*)$/gim,
		        partials: {
		          features: '{{#if features}}{{#each features}}{{> feature}}{{/each}}{{else}}{{> empty}}{{/if}}\n',
		          feature: '- {{this}} {{this.date}}\n'
		        }
		      }
		    }
		},

		replace: {
		    dev: {
		        options: {
		          patterns: [
		            {
		              match: 'servidor',
		              replacement: '<%= secret.mysql.dev.host %>'
		            },
		            {
		              match: 'usuario_db',
		              replacement: '<%= secret.mysql.dev.user %>'
		            },
		            {
		              match: 'pwd_db',
		              replacement: '<%= secret.mysql.dev.pass %>'
		            },
		            {
		              match: 'nombre_db',
		              replacement: '<%= secret.mysql.dev.dbname %>'
		            }
		          ]
		        },
		        files: [
		          {expand: true, flatten: true, src: ['src/dev/api/Api.php'], dest: 'dev/api/'}
		        ]
		      },
		      pro: {
		        options: {
		          patterns: [
		            {
		              match: 'servidor',
		              replacement: '<%= secret.mysql.pro.host %>'
		            },
		            {
		              match: 'usuario_db',
		              replacement: '<%= secret.mysql.pro.user %>'
		            },
		            {
		              match: 'pwd_db',
		              replacement: '<%= secret.mysql.pro.pass %>'
		            },
		            {
		              match: 'nombre_db',
		              replacement: '<%= secret.mysql.pro.dbname %>'
		            }
		          ]
		        },
		        files: [
		          {expand: true, flatten: true, src: ['src/dev/api/Api.php'], dest: 'build/api/'}
		        ]
		      }
	    }



	});

	// tareas principales

	grunt.registerTask('default',[ 'clean:dev' , 'stylus' , 'browserify' , 'copy:dev' , 'replace:dev' , 'open:dev' , 'watch:scripts' ]);

	grunt.task.registerTask('build', [ 'clean:pro', 'stylus' , 'browserify' , 'uglify' , 'copy:pro', 'replace:pro' ]);

	grunt.task.registerTask('deploy', [ 'clean:pro', 'stylus' , 'browserify' , 'uglify' , 'copy:pro' , 'replace:pro' , 'sftp' , 'open:pro' ]);

	// tareas standalone
	grunt.task.registerTask('genstylus', ['stylus']);
	grunt.task.registerTask('borrar', [ 'clean' ]);
	grunt.task.registerTask('log', [ 'changelog' ]);
	grunt.task.registerTask('rep', [ 'replace' ]);
	grunt.task.registerTask('pro', [ 'sftp' ]);




};