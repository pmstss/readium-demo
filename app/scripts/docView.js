/*global require, LookUp, ReadiumSDK*/

require(['jquery', 'backbone'], function ($, Backbone) {
    'use strict';

    LookUp.views.DocView = Backbone.View.extend({
        initialize: function (options) {
            this.appState = options.appState;

            this.$loader = $('#loader');

            this.listenTo(this.appState, 'change:readium', this.onReadiumChange);
            this.listenTo(this.appState, 'change:toolbarsVisible', this.onToolbarsVisibleChange);
            this.listenTo(this.appState, 'change:zoom', this.onZoomChange);
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
                fontSize : zoom
            });
        }
    });
});




