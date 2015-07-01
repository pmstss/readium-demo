/*global require, LookUp*/

require(['jquery', 'backbone'], function ($, Backbone) {
    'use strict';

    LookUp.Router = Backbone.Router.extend({
        routes: {
            'custom/:bookName': 'routeCustomBook',
            'book/:bookName': 'routeBook',
            '*path': 'defaultRoute'
        },

        initialize: function () {
            this.appState = new LookUp.models.AppState();

            var $docView = $('#docView');

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

        routeCustomBook: function () {
            var readium = this.appState.get('readium');
            if (readium) {
                readium.closePackageDocument();
            }

            var customBookData = this.appState.get('customBookData');
            if (customBookData) {
                this.appState.set('readium', LookUp.ReadiumUtils.createInstance({
                    el: '#epubContainer',
                    url: customBookData
                }));
            } else {
                this.defaultRoute();
            }
        },

        routeBook: function (bookName) {
            var readium = this.appState.get('readium');
            if (readium) {
                readium.closePackageDocument();
            }

            bookName = /\.epub$/.test(bookName) ? bookName : bookName + '/';
            console.log('### before createInstance');
            this.appState.set('readium', LookUp.ReadiumUtils.createInstance({
                el: '#epubContainer',
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
