define(['jquery', 'backbone', 'lu-model-state'], function ($, Backbone, appState) {
    'use strict';

    return Backbone.View.extend({
        events: {
            'click .page_navigation.prev': 'onPrevPageClick',
            'click .page_navigation.next': 'onNextPageClick'
        },

        initialize: function () {
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
            var readium = appState.get('readium');
            if (readium) {
                readium.reader.openPageLeft();
            }
        },

        gotoNextPage: function () {
            var readium = appState.get('readium');
            if (readium) {
                readium.reader.openPageRight();
            }
        }
    });
});
