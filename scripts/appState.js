define(['jquery', 'backbone'], function ($, Backbone) {
    'use strict';

    var AppStateModel = Backbone.Model.extend({
        defaults: {
            readium: null,
            packageDocument: null,
            toolbarsVisible: true,
            fullscreen: false,
            wordsMode: false,
            zoom: 100
        },

        initialize: function () {
            this.ZOOM_MIN = 25;
            this.ZOOM_MAX = 500;
            this.ZOOM_DEFAULT = 100;
        },

        zoomIn: function () {
            var zoom = this.get('zoom');
            if (zoom < this.ZOOM_MAX) {
                this.set('zoom', zoom + 10);
                return true;
            }
            return false;
        },

        zoomOut: function () {
            var zoom = this.get('zoom');
            if (zoom > this.ZOOM_MIN) {
                this.set('zoom', zoom - 10);
                return true;
            }
            return false;
        },

        resetZoom: function () {
            this.set('zoom', this.ZOOM_DEFAULT);
        }
    });

    return new AppStateModel();
});
