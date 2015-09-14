require.config({
    shim: {
        'readium_shared_js': {
            deps: ['readium_cfi_js']
        },
        'readium_js': {
            deps: ['readium_shared_js']
        },
        'readium_cfi_js/cfi_parser': {
            exports: 'EPUBcfiParser'
        }
    },

    packages: [{
        name: 'readium_cfi_js',
        location: '../readium-js/readium-shared-js/readium-cfi-js/js',
        main: 'cfi_API'
    }, {
        name: 'readium_shared_js',
        location: '../readium-js/readium-shared-js/js',
        main: 'globalsSetup'
    }, {
        name: 'readium_js',
        location: '../readium-js/js',
        main: 'Readium'
    }],

    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        handlebars: '../bower_components/handlebars/handlebars',
        underscore: '../bower_components/underscore/underscore',

        // readium dependencies
        'readium-external-libs': '../readium-js/build-output/_multiple-bundles/readium-external-libs',
        'text': '../readium-js/node_modules/requirejs-text/text',
        'readium_js_plugins': '../readium-js/readium-shared-js/js/plugins_controller',
        'readium_cfi_js/cfi_parser': '../readium-js/readium-shared-js/readium-cfi-js/gen/cfi_parser_gen',
        'version': '../readium-js/dev/version', /*json*/
        /*'readium-cfi-js': '../readium-js/build-output/_multiple-bundles/readium-cfi-js',
         'readium-js': '../readium-js/build-output/_multiple-bundles/readium-js',
         'readium-shared-js': '../readium-js/build-output/_multiple-bundles/readium-shared-js',*/

        'main': 'main',
        'lu-handlebars-helpers': 'handlebarsHelpers',
        'lu-utils': 'utils',
        'lu-router': 'router',
        'lu-model-state': 'appState',
        'lu-view-doc': 'docView',
        'lu-view-toc': 'docTocView',
        'lu-view-doc-tools': 'docToolsView',
        'lu-view-doc-footer': 'docFooterView',
        'lu-view-doc-header': 'docHeaderView',
        'lu-view-page-navigation': 'docPageNavigationView'
    },

    deps: ['main'],

    bundles: {
        'readium-external-libs': ['mime-types', 'zip', 'zip-ext', 'zip-fs', 'cryptoJs/sha1', 'cryptoJs/core',
            'URIjs', 'punycode', 'SecondLevelDomains', 'IPv6', 'jquerySizes', 'domReady', 'eventEmitter', 'console_shim',
            'rangy', 'rangy-core', 'rangy-textrange', 'rangy-highlighter', 'rangy-cssclassapplier', 'rangy-position']
    }
});