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
        },
        zip: {
            exports: 'zip'
        },
        'mime-types': {
            deps: ['zip'],
            exports: 'zip'
        },
        'zip-fs': {
            deps: ['mime-types'],
            exports: 'zip'
        },
        'zip-ext': {
            deps: ['zip-fs'],
            exports: 'zip'
        },
        'inflate': {
            exports: 'zip'
        },
        'deflate': {
            exports: 'zip'
        },
        jquerySizes: {
            deps: ['jquery'],
            exports: 'jQuery'
        },
        'rangy-core': {
            deps: ['jquery'],
            init: function (jQuery) {
                'use strict';
                var rangi = this.rangy;
                jQuery(function () {
                    rangi.init();
                });
                return this.rangy;
            },
            exports: 'rangy'
        },
        'rangy-textrange': {
            deps: ['rangy-core'],
            exports: 'rangy.modules.TextRange'
        },
        'rangy-highlighter': {
            deps: ['rangy-core'],
            exports: 'rangy.modules.Highlighter'
        },
        'rangy-cssclassapplier': {
            deps: ['rangy-core'],
            exports: 'rangy.modules.ClassApplier'
        },
        'rangy-position': {
            deps: ['rangy-core'],
            exports: 'rangy.modules.Position'
        }
    },

    packages: [{
        name: 'cryptoJs',
        location: '../readium-js/node_modules/crypto-js',
        main: 'core'
    }, {
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
        'console_shim': '../readium-js/readium-shared-js/lib/console_shim',
        'eventEmitter': '../readium-js/readium-shared-js/node_modules/eventemitter3/_rjs/index',
        'IPv6': '../readium-js/readium-shared-js/node_modules/URIjs/src/IPv6',
        'SecondLevelDomains': '../readium-js/readium-shared-js/node_modules/URIjs/src/SecondLevelDomains',
        'punycode': '../readium-js/readium-shared-js/node_modules/URIjs/src/punycode',
        'URIjs': '../readium-js/readium-shared-js/node_modules/URIjs/src/URI',
        'jquerySizes': '../readium-js/readium-shared-js/node_modules/jquery-sizes/lib/jquery.sizes',
        'rangy': '../readium-js/readium-shared-js/lib/rangy/rangy',
        'rangy-core': '../readium-js/readium-shared-js/lib/rangy/rangy-core',
        'rangy-textrange': '../readium-js/readium-shared-js/lib/rangy/rangy-textrange',
        'rangy-highlighter': '../readium-js/readium-shared-js/lib/rangy/rangy-highlighter',
        'rangy-cssclassapplier': '../readium-js/readium-shared-js/lib/rangy/rangy-cssclassapplier',
        'rangy-position': '../readium-js/readium-shared-js/lib/rangy/rangy-position',
        'text': '../readium-js/node_modules/requirejs-text/text',
        'zip': '../readium-js/node_modules/zip-js/WebContent/zip',
        'mime-types': '../readium-js/node_modules/zip-js/WebContent/mime-types',
        'zip-fs': '../readium-js/node_modules/zip-js/WebContent/zip-fs',
        'zip-ext': '../readium-js/node_modules/zip-js/WebContent/zip-ext',
        'inflate': '../readium-js/node_modules/zip-js/WebContent/inflate',
        'deflate': '../readium-js/node_modules/zip-js/WebContent/deflate',
        'z-worker': '../readium-js/node_modules/zip-js/WebContent/z-worker',
        'readium_js_plugins': '../readium-js/readium-shared-js/js/plugins_controller',
        'readium_cfi_js/cfi_parser': '../readium-js/readium-shared-js/readium-cfi-js/gen/cfi_parser_gen',
        'version': '../readium-js/dev/version', /*json*/

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
    }
});

require(['jquery', 'backbone', 'lu-handlebars-helpers', 'readium_cfi_js', 'readium_shared_js',
    'readium_js'], function ($, Backbone) {
    'use strict';

    require(['lu-router'], function () {
        $(function () {
            Backbone.history.start();
        });
    });
});