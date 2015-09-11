define(['jquery', 'backbone', 'readium_js/Readium', 'lu-model-state', 'lu-view-doc', 'lu-view-page-navigation',
        'lu-view-toc', 'lu-view-doc-tools', 'lu-view-doc-footer', 'lu-view-doc-header'],
function ($, Backbone, Readium, appState, DocView, DocPageNavigationView,
          DocTOCView, DocToolsView, DocFooterView, DocHeaderView) {
    'use strict';

    var Router = Backbone.Router.extend({
        routes: {
            'book/:bookName': 'routeBook',
            '*path': 'defaultRoute'
        },

        initialize: function () {
            var $docView = $('#docView');
            this.$epubContainer = $docView.find('#epubContainer');

            new DocView({
                el: $docView
            });

            new DocPageNavigationView({
                el: $docView.find('.pageNavigationContainer')
            });

            new DocTOCView({
                el: $docView.find('.toc')
            });

            new DocToolsView({
                el: $docView.find('.tools')
            });

            new DocFooterView({
                el: $('.pagesSliderContainer')
            });

            new DocHeaderView({
                el: $docView.find('.header')
            });

            appState.on('change:customBookData', function (appState, customBookData) {
                if (customBookData) {
                    this.navigate('custom/' + customBookData.name, {
                        trigger: true,
                        replace: true
                    });
                }
            }.bind(this));
        },

        createReadiumInstance: function (options) {
            var readium = new Readium({}, {
                el: options.el,
                //TODO use internal link. but relative links are treated here as links inside epub
                mathJaxUrl: 'https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML'
            });

            readium.reader.updateSettings({
                syntheticSpread: 'auto',
                scroll: 'auto'
            });

            readium.openPackageDocument(options.url, function (packageDocument) {
                appState.set('packageDocument', packageDocument);
            }.bind(this));

            return readium;
        },

        routeBook: function (bookName) {
            var readium = appState.get('readium');
            if (readium) {
                readium.closePackageDocument();
                this.$epubContainer.empty();
            }

            bookName = /\.epub$/.test(bookName) ? bookName : bookName + '/';

            var loc = document.location.toString();
            appState.set('readium', this.createReadiumInstance({
                el: this.$epubContainer.get(0),
                url: loc.substr(0, loc.indexOf('readium-demo') + 'readium-demo'.length) + '/books/' + bookName
            }));
        },

        defaultRoute: function () {
            this.navigate('book/epub30-spec', {
                trigger: true,
                replace: true
            });
        }
    });

    return new Router();
});
