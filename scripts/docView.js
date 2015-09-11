define(['jquery', 'backbone', 'lu-model-state'], function ($, Backbone, appState) {
    'use strict';

    return Backbone.View.extend({
        initialize: function () {
            this.$loader = $('#loader');

            this.listenTo(appState, 'change:readium', this.onReadiumChange);
            this.listenTo(appState, 'change:toolbarsVisible', this.onToolbarsVisibleChange);
            this.listenTo(appState, 'change:zoom', this.onZoomChange);
        },

        onReadiumChange: function (appState, readium) {
            this.showLoader();

            readium.reader.on(ReadiumSDK.Events.CONTENT_DOCUMENT_LOADED, function () {
                this.hideLoader();
            }.bind(this));
        },

        showLoader: function () {
            this.$loader.show();
        },

        hideLoader: function () {
            this.$loader.hide();
        },

        onToolbarsVisibleChange: function (appState, toolbarsVisible) {
            this.$el.toggleClass('tb', !!toolbarsVisible);
        },

        onZoomChange: function (appState, zoom) {
            appState.get('readium').reader.updateSettings({
                fontSize: zoom
            });
        }
    });
});