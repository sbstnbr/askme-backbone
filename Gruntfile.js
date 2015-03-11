var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

module.exports = function (grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        watch: {
            options: {
                nospawn: true,
                livereload: true
            },
            sass: {
                options: {
                    livereload: false
                },
                files: ['app/scss/*.scss'],
                task: ['sass:dist']
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    'app/*.html'
                ]
            }
        },
        connect: {
            options: {
                port: 9999,
                hostname: '0.0.0.0'
            },
            proxies: [{
                context: ['/api'],
                host: 'localhost',
                port: 8888
            }],
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            proxySnippet,
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'app')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            server: '.tmp',
            dist: 'dist/'
        },
        requirejs: {
            dist: {
                options: {
                    dir: 'dist',
                    appDir: 'app',
                    baseUrl: 'scripts',
                    mainConfigFile: 'app/scripts/main.js',
                    removeCombined: true,
                    findNestedDependencies: true,
                    optimize: 'uglify'
                }
            }
        },
        useminPrepare: {
            html: 'index.html',
            options: {
                dest: 'dist'
            }
        },
        usemin: {
            html: ['dist/{,*/}*.html'],
            css: ['dist/css/{,*/}*.css'],
            options: {
                dirs: ['dist']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'app/img',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: 'dist/img'
                }]
            }
        },
        cssmin: {
            dist: {
                files: [{
                    'dist/css/main.css': [
                        'app/css/{,*/}*.css'
                    ],
                    'dist/css/fonts.css': [
                        'app/css/{,*/}*.css'
                    ]                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeCommentsFromCDATA: true,
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '',
                    src: 'app/*.html',
                    dest: 'dist/'
                }]
            }
        },
        sass: {
            dist: {
                files: [{
                    'app/css/main.css': 'app/scss/main.scss',
                    'app/css/fonts.css': 'app/scss/fonts.scss'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'fonts',
                    src: '{,*/}*.{otf,ttf}',
                    dest: 'dist/fonts'
                }]
            }
        }
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'configureProxies',
            'sass:dist',
            'connect:livereload',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'sass',
        'useminPrepare',
        'cssmin',
        'usemin',
        'htmlmin',
        'imagemin',
        'requirejs',
        'copy'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);

};
