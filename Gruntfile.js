module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        exec: {
            clean: {
                cwd: '',
                cmd: 'git clean -fxd'
            },

            npm: {
                cwd: '',
                cmd: 'npm install'
            },

            zip: {
                cwd: '',
                cmd: 'zip -r -y _DeveloperDashboard.zip build'
            }
        },

        webpack: {
            options : {
                stats : {
                    colors  : true,
                    modules : true,
                    reasons : true
                },

                progress    : true,
                failOnError : true,
                devTool     : 'source-map',

                keepAlive : false,
                watch     : false,

                module : {
                    loaders : [
                        {
                            test    : /\.jsx?$/,
                            exclude : /node_modules/,
                            loader  : 'babel?presets[]=react,presets[]=es2015'
                        }
                    ]
                }
            },

            build: {
                entry: {
                    index: './ui/jsx/index.js'
                },

                output: {
                    path: 'ui/js/',
                    filename: '[name]-bundle.js'
                }
            }
        },

        copy: {
            build: {
                files: [
                    {
                        src: [
                            'manifest.json',
                            'README.md'
                        ],
                        dest: 'build',
                        expand: true
                    },
                    //{
                    //    cwd    : 'lib',
                    //    src    : '**/*',
                    //    dest   : 'build/lib',
                    //    expand : true
                    //},
                    {
                        cwd: 'resources',
                        src: '**/*',
                        dest: 'build/resources',
                        expand: true
                    },
                    {
                        cwd: 'ui/js',
                        src: '**/*',
                        dest: 'build/ui/js',
                        expand: true
                    },
                    {
                        cwd: 'ui/css',
                        src: '**/*',
                        dest: 'build/ui/css',
                        expand: true
                    },
                    {
                        cwd: 'ui',
                        src: [
                            'index.html'
                        ],
                        dest: 'build/ui',
                        expand: true
                    },

                    {
                        cwd: 'background',
                        src: 'background.js',
                        dest: 'build/background',
                        expand: true
                    }
                ]
            }
        },

        uglify: {
            options: {
                mangle: {
                    topLevel: true,
                    eval: true
                },
                compress: {
                    dead_code: true,
                    unused: true,
                    drop_console: true
                }
            },

            ui: {
                expand: true,
                src: ['*.js'],
                dest: 'build/ui/js/',
                cwd: 'build/ui/js/'
            },

            //background : {
            //    expand : true,
            //    src    : [ '*.js' ],
            //    dest   : 'build/background/',
            //    cwd    : 'build/background/'
            //}
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-webpack');
    //grunt.loadNpmTasks('grunt-string-replace');

    // Default task(s).
    grunt.registerTask('default', [
        'exec:clean',
        'exec:npm',

        'webpack',

        'copy:build',
        'uglify',

        'exec:zip'
    ]);

    grunt.registerTask('webpack', [
        'webpack'
    ]);
};
