/*global require, LookUp*/

require(['jquery', 'backbone', 'Readium'], function ($, Backbone, Readium) {
    'use strict';

    LookUp.Router = Backbone.Router.extend({
        routes: {
            'book/:bookName': 'routeBook',
            '*path': 'defaultRoute'
        },

        initialize: function () {
            this.appState = new LookUp.models.AppState();

            var $docView = $('#docView');
            this.$epubContainer = $docView.find('#epubContainer');

            new LookUp.views.DocView({
                appState: this.appState,
                el: $docView
            });

            new LookUp.views.DocPageNavigationView({
                el: $docView.find('.pageNavigationContainer'),
                appState: this.appState
            });

            new LookUp.views.DocTOCView({
                el: $docView.find('.toc'),
                appState: this.appState
            });

            new LookUp.views.DocToolsView({
                el: $docView.find('.tools'),
                appState: this.appState
            });

            new LookUp.views.DocFooterView({
                el: $('.pagesSliderContainer'),
                appState: this.appState
            });

            new LookUp.views.DocHeaderView({
                el: $docView.find('.header'),
                appState: this.appState
            });

            this.appState.on('change:customBookData', function (appState, customBookData) {
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
                this.appState.set('packageDocument', packageDocument);
            }.bind(this));

            return readium;
        },

        routeBook: function (bookName) {
            var readium = this.appState.get('readium');
            if (readium) {
                readium.closePackageDocument();
                this.$epubContainer.empty();
            }

            bookName = /\.epub$/.test(bookName) ? bookName : bookName + '/';

            this.appState.set('readium', this.createReadiumInstance({
                el: this.$epubContainer.get(0),
                url: '../books/' + bookName
            }));
        },

        defaultRoute: function () {
            this.navigate('book/William_Shakespeare_Venus_and_Adonis', {
                trigger: true,
                replace: true
            });
        }
    });
});
