module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),

        exec : {
            clean : {
                cwd : '',
                cmd : 'git clean -fxd'
            },

            npm : {
                cwd : '',
                cmd : 'npm install'
            },

            zip : {
                cwd : '',
                cmd : 'zip -r -y _DeveloperDashboard.zip build'
            }
        },

        copy : {
            build : {
                files : [
                    {
                        src    : [
                            'manifest.json',
                            'README.md'
                        ],
                        dest   : 'build',
                        expand : true
                    },
                    {
                        cwd    : 'lib',
                        src    : '**/*',
                        dest   : 'build/lib',
                        expand : true
                    },
                    {
                        cwd    : 'resources',
                        src    : '**/*',
                        dest   : 'build/resources',
                        expand : true
                    },
                    {
                        cwd    : 'ui/js',
                        src    : '**/*',
                        dest   : 'build/ui/js',
                        expand : true
                    },
                    {
                        cwd    : 'ui',
                        src    : [
                            'index.html',
                            'ui.css'
                        ],
                        dest   : 'build/ui',
                        expand : true
                    },

                    {
                        cwd    : 'background',
                        src    : 'background.js',
                        dest   : 'build/background',
                        expand : true
                    }
                ]
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    //grunt.loadNpmTasks('grunt-string-replace');

    // Default task(s).
    grunt.registerTask('default', [
        'exec:clean',
        'exec:npm',

        'copy:build',

        'exec:zip'
    ]);
};
