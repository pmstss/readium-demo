module.exports = function (grunt) {
    'use strict';

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Configurable paths
    var config = {
        app: '.',
        dist: 'dist'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: config,

        // Empties folders to start fresh
        clean: {
            all: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp/*',
                        '<%= config.dist %>/*'
                    ]
                }]
            },
            temp: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp/*'
                    ]
                }]
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            src: [
                'Gruntfile.js',
                '<%= config.app %>/scripts/{,*/}*.js'
            ],
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish'),
                verbose: true
            }
        },

        jscs: {
            src: [
                'Gruntfile.js',
                '<%= config.app %>/scripts/{,*/}*.js'
            ],
            options: {
                config: '.jscsrc',
                verbose: true
            }
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            all: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%= config.dist %>/images'
                }]
            }
        },

        svgmin: {
            all: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= config.dist %>/images'
                }]
            }
        },

        requirejs: {
            all: {
                options: {
                    baseUrl: 'scripts',
                    mainConfigFile: '<%= config.app %>/scripts/main.js',
                    keepBuildDir: true,

                    name: 'main',
                    include: ['lu-router'],
                    out: '<%= config.dist %>/scripts/app.js',

                    // insert almond in all your modules
                    almond: true,
                    // replace require script calls, with the almond modules in the following files
                    replaceRequireScript: [{
                        files: ['<%= config.dist %>/dev.html'],
                        module: 'main',
                        modulePath: 'scripts/app'
                    }],
                    optimize: 'uglify2',
                    logLevel: 0,    // 0 - trace, 4 - silent
                    throwWhen: {
                        optimize: true
                    }
                }
            }
        },

        htmlmin: {
            all: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: false,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: '{,*/}*.html',
                    dest: '<%= config.dist %>'
                }]
            }
        },

        // Renames files for browser caching purposes
        rev: {
            all: {
                files: {
                    src: [
                        '<%= config.dist %>/scripts/{,*/}*.js',
                        '<%= config.dist %>/styles/{,*/}*.css',
                        '<%= config.dist %>/styles/fonts/{,*/}*.*',
                        '<%= config.dist %>/images/{,*/}*.*',
                        '<%= config.dist %>/*.{png}'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= config.dist %>'
            },
            html: '<%= config.app %>/dev.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: [
                    '<%= config.dist %>',
                    '<%= config.dist %>/images',
                    '<%= config.dist %>/styles'
                ]
            },
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/styles/{,*/}*.css']
        },

        // Copies remaining files to places other tasks can use
        copy: {
            all: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        '*.{ico,png,gif}',
                        'fonts/{,*/}*.*',
                        'dev.html'
                    ]
                    /*rename: function (dest, src) {
                        return src === 'dev.html' ? dest + 'index.html' : dest + src;
                    }*/
                }]
            }
        },

        rename: {
            all: {
                src: '<%= config.dist %>/dev.html',
                dest: '<%= config.dist %>/index.html'
            }
        }
    });

    grunt.registerTask('default', [
        'jshint',
        'jscs'
    ]);

    grunt.registerTask('build', [
        'default',
        'clean',
        'copy',
        'imagemin',
        'svgmin',
        'useminPrepare',
        'concat',
        'cssmin',
        'usemin',
        'requirejs',
        'htmlmin',
        //'rev',
        'clean:temp',
        'rename'
    ]);
};
