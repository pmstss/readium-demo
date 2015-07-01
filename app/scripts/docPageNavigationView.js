/*global require, LookUp*/

require(['jquery', 'backbone'], function ($, Backbone) {
    'use strict';

    LookUp.views.DocPageNavigationView = Backbone.View.extend({
        appState: null,

        events: {
            'click .page_navigation.prev': 'onPrevPageClick',
            'click .page_navigation.next': 'onNextPageClick'
        },

        initialize: function (options) {
            this.appState = options.appState;

            $(document).keydown(function (e) {
                if ($(e.target).closest('.fe').length || /^(INPUT|TEXTAREA|BUTTON|SELECT)$/.test(e.target.tagName)) {
                    return;
                }

                switch (e.which || e.keyCode) {
                    case 37: // left
                    case 38: // up
                        e.preventDefault();
                        this.gotoPrevPage();
                        break;
                    case 40: // down
                    case 39: // right
                        e.preventDefault();
                        this.gotoNextPage();
                        break;
                }
            }.bind(this));
        },

        onPrevPageClick: function (e) {
            e.stopImmediatePropagation();
            e.preventDefault();

            this.gotoPrevPage();
        },

        onNextPageClick: function (e) {
            e.stopImmediatePropagation();
            e.preventDefault();

            this.gotoNextPage();
        },

        gotoPrevPage: function () {
            var readium = this.appState.get('readium');
            if (readium) {
                readium.reader.openPageLeft();
            }
        },

        gotoNextPage: function () {
            var readium = this.appState.get('readium');
            if (readium) {
                readium.reader.openPageRight();
            }
        }
    });
});
