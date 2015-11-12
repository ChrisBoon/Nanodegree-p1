module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //concatenate js
        concat: {
            dist: {
                src: [
                    'js/libs/*.js', // Library JS
                    'js/site/*.js'  // My JS
                ],
                dest: 'js/build/production.js',
            }
        },
        //minify js
        uglify: {
            build: {
                src: 'js/build/production.js',
                dest: 'js/build/production.min.js'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'css/build/global.css': 'css/sass/global.scss'
                }
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({browsers: ['last 3 versions']})
                ]
            },
            dist: {
                src: 'css/build/global.css'
            }
        },
        csscomb: {
            foo: {
                 files: {
                     'css/build/global.css': ['css/build/global.css']
                 }
            }
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    keepalive: true
                }
            }
        },
        watch: {
            scripts: {
                files: ['js/site/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['css/sass/*.scss'],
                tasks: ['sass','postcss','csscomb'],
                options: {
                    spawn: false,
                    livereload: true,
                }
            }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-csscomb');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify']);

};