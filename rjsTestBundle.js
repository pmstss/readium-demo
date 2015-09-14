({
    baseUrl: 'scripts',

   /* shim: {
        'readium_shared_js': {
            deps: ['readium_cfi_js']
        },
        'readium_js': {
            deps: ['readium_shared_js']
        },
        'readium_cfi_js/cfi_parser': {
            exports: 'EPUBcfiParser'
        }
    },*/

    packages: [/*{
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
    }*/],

    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        handlebars: '../bower_components/handlebars/handlebars',
        underscore: '../bower_components/underscore/underscore',

        // readium dependencies
        'readium-external-libs': '../readium-js/build-output/_multiple-bundles/readium-external-libs',
        'readium-cfi-js': '../readium-js/build-output/_multiple-bundles/readium-cfi-js',
        'readium-js': '../readium-js/build-output/_multiple-bundles/readium-js',
        'readium-shared-js': '../readium-js/build-output/_multiple-bundles/readium-shared-js',

        /*'text': '../readium-js/node_modules/requirejs-text/text',
        'inflate': '../readium-js/node_modules/zip-js/WebContent/inflate',
        'deflate': '../readium-js/node_modules/zip-js/WebContent/deflate',
        'z-worker': '../readium-js/node_modules/zip-js/WebContent/z-worker',*/

        /*'readium_js_plugins': '../readium-js/readium-shared-js/js/plugins_controller',
        'readium_cfi_js/cfi_parser': '../readium-js/readium-shared-js/readium-cfi-js/gen/cfi_parser_gen',
        'version': '../readium-js/build-output/version',*/

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

    bundles: {
        'readium-external-libs': ['mime-types', 'zip', 'zip-ext', 'zip-fs', 'cryptoJs/sha1', 'cryptoJs/core',
            'URIjs', 'punycode', 'SecondLevelDomains', 'IPv6', 'jquerySizes', 'domReady', 'eventEmitter', 'console_shim',
            'rangy', 'rangy-core', 'rangy-textrange', 'rangy-highlighter', 'rangy-cssclassapplier', 'rangy-position'],
            
        'readium-js': ['readium_js/Readium', 'readium_js/epub-fetch/content_document_fetcher', 'readium_js/epub-fetch/discover_content_type',
            'readium_js/epub-fetch/encryption_handler', 'readium_js/epub-fetch/iframe_zip_loader', 'readium_js/epub-fetch/markup_parser',
            'readium_js/epub-fetch/plain_resource_fetcher', 'readium_js/epub-fetch/publication_fetcher', 'readium_js/epub-fetch/resource_cache',
            'readium_js/epub-fetch/zip_resource_fetcher', 'readium_js/epub-model/manifest', 'readium_js/epub-model/metadata',
            'readium_js/epub-model/package_document', 'readium_js/epub-model/package_document_parser', 'readium_js/epub-model/smil_document_parser',
            'text', 'text!version.json'],
        
        'readium-shared-js': ['readium_js_plugins', 'readium_shared_js/globals', 'readium_shared_js/globalsSetup', 'readium_shared_js/helpers', 
            'readium_shared_js/models/bookmark_data', 'readium_shared_js/models/current_pages_info', 'readium_shared_js/models/fixed_page_spread', 
            'readium_shared_js/models/media_overlay', 'readium_shared_js/models/package', 'readium_shared_js/models/package_data', 
            'readium_shared_js/models/page_open_request', 'readium_shared_js/models/smil_iterator', 'readium_shared_js/models/smil_model', 
            'readium_shared_js/models/spine', 'readium_shared_js/models/spine_item', 'readium_shared_js/models/style', 
            'readium_shared_js/models/style_collection', 'readium_shared_js/models/switches', 'readium_shared_js/models/trigger', 
            'readium_shared_js/models/viewer_settings', 'readium_shared_js/views/audio_player', 'readium_shared_js/views/cfi_navigation_logic', 
            'readium_shared_js/views/fixed_view', 'readium_shared_js/views/iframe_loader', 'readium_shared_js/views/internal_links_support', 
            'readium_shared_js/views/media_overlay_data_injector', 'readium_shared_js/views/media_overlay_element_highlighter', 
            'readium_shared_js/views/media_overlay_player', 'readium_shared_js/views/one_page_view', 'readium_shared_js/views/reader_view', 
            'readium_shared_js/views/reflowable_view', 'readium_shared_js/views/scroll_view'],
            
        'readium-cfi-js': ['readium_cfi_js/cfi_API', 'readium_cfi_js/cfi_generator', 'readium_cfi_js/cfi_instructions', 'readium_cfi_js/cfi_interpreter', 
            'readium_cfi_js/cfi_parser', 'readium_cfi_js/cfi_runtime_errors']
    },
    
    modules: [{
        name: 'myModule',
        create: true,
        include: ['lu-router']
    }],
    
    dir: 'myout'
})