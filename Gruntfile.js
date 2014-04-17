module.exports = function (grunt) {

    grunt.config.init({
        // Directory constants
        BUILD_DIR: "./build",
        CLIENT_DIR: "./app",
        BOWER_DIR: "./bower_components",

        // Glob constants
        ALL_FILES: "**/*",
        HTML_FILES: "**/*.html",
        CSS_FILES: "**/*.css",
        LESS_FILES: "**/*.less",
        JS_FILES: "**/*.js",
        JSX_FILES: "**/*.jsx",
        IMG_FILES: "**/*.{png,gif,jpg,jpeg}",
        FONT_FILES: "**/*.{eot,svg,ttf,woff}",

        // Compile client-side Javascript using CommonJS
        browserify: {
            options: {
                transform: [ require("grunt-react").browserify ],
                bundleOptions: {
                    debug: true
                }
            },
            app: {
                dest: "<%= BUILD_DIR %>/js/app.js",
                src: "<%= CLIENT_DIR %>/scripts/app.js"
            }
        },

        // Wipe the `build` directory
        clean: {
            build: "<%= BUILD_DIR %>",
            generated: [ "<%= BUILD_DIR %>/js/app.js", "<%= BUILD_DIR %>/js/vendor.js", "<%= BUILD_DIR %>/css/app.css" ],
            tmp: "./.tmp"
        },

        // Concatenate vendor files
        concat: {
            vendor: {
                dest: "<%= BUILD_DIR %>/js/vendor.js",
                src: [
                    "<%= BOWER_DIR %>/console-polyfill/index.js",
                    "<%= BOWER_DIR %>/es5-shim/es5-shim.js",
                    "<%= BOWER_DIR %>/es5-shim/es5-sham.js",
                    "<%= BOWER_DIR %>/json3/lib/json3.js",
                    "<%= BOWER_DIR %>/react/react-with-addons.js",
                    "<%= BOWER_DIR %>/superagent/superagent.js",
                    "<%= BOWER_DIR %>/amplify/lib/amplify.core.js"
                ]
            }
        },

        copy: {
            // Bootstrap fonts
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: "<%= BOWER_DIR %>/bootstrap/fonts",
                        src: "<%= FONT_FILES %>",
                        dest: "<%= BUILD_DIR %>/img/fonts"
                    }
                ]
            },

            // App images from `client`
            images: {
                files: [
                    {
                        expand: true,
                        cwd: "<%= CLIENT_DIR %>/images",
                        src: "<%= IMG_FILES %>",
                        dest: "<%= BUILD_DIR %>/img"
                    }
                ]
            },
            templates: {
                files: [
                    {
                        expand: true,
                        cwd: "<%= CLIENT_DIR %>",
                        src: "<%= HTML_FILES %>",
                        dest: "<%= BUILD_DIR %>"
                    }
                ]
            }
        },

        // Optimize images
        imagemin: {
            dynamic: {
                options: {
                    progressive: true,
                    interlaced: true,
                    pngquant: true
                },
                files: [
                    {
                        expand: true,
                        cwd: "<%= BUILD_DIR %>/img",
                        src: "<%= IMG_FILES %>",
                        dest: "<%= BUILD_DIR %>/img"
                    }
                ]
            }
        },

        // Validate app `client` JS
        jshint: {
            options: {
                jshintrc: true,
                reporter: require('jshint-stylish')
            },
            files: [ "<%= CLIENT_DIR %>/{<% JS_FILES %>,<%= JSX_FILES %>}" ]
        },

        // Compile `app.less` -> `app.css`
        less: {
            "<%= BUILD_DIR %>/css/app.css": "<%= CLIENT_DIR %>/styles/app.less",
            options: {
                ieCompat: true,
                sourceMap: true,
                outputSourceFiles: true
            }
        },

        // Input for optimized app index
        useminPrepare: {
            html: "<%= BUILD_DIR %>/index.html",
            options: {
                dest: "<%= BUILD_DIR %>"
            }
        },

        // Output for optimized app index
        usemin: {
            html: "<%= BUILD_DIR %>/index.html"
        },

        // Watch for changes
        watch: {
            // Changes to app code should be validated and re-copied to the `build`
            js: {
                files: [
                    "<%= CLIENT_DIR %>/scripts/<%= JS_FILES %>",
                    "<%= CLIENT_DIR %>/scripts/<%= JSX_FILES %>"
                ],
                tasks: [ "jshint", "browserify" ]
            },
            // Changes to app styles should re-compile
            less: {
                files: "<%= CLIENT_DIR %>/styles/<%= LESS_FILES %>",
                tasks: [ "less" ]
            },
            // Changes to app templates should re-copy & re-compile them
            templates: {
                files: "<%= CLIENT_DIR %>/<%= HTML_FILES %>",
                tasks: [ "copy:templates" ]
            },
            images: {
                files: "<%= CLIENT_DIR %>/<%= IMG_FILES %>",
                tasks: [ "copy:images" ]
            }
        }
    });

    // Create build
    grunt.registerTask("build", [ "clean:build", "copy", "less", "concat:vendor", "jshint", "browserify" ]);

    // Optimize build
    grunt.registerTask("optimize", [ "useminPrepare", "concat", "cssmin", "uglify", "imagemin", "clean:generated", "usemin", "clean:tmp" ]);

    // Default task (develop)
    grunt.registerTask("default", [ "build", "watch" ]);

    // Autoload grunt tasks
    require("load-grunt-tasks")(grunt);
};
