/*global require, LookUp*/

require(['jquery', 'backbone', 'handlebars'], function ($, Backbone, Handlebars) {
    'use strict';

    LookUp.views.DocHeaderView = Backbone.View.extend({
        events: {
            'click .books .circle': 'onBooksIconClick'
        },

        templateBooksList: Handlebars.compile($('#templateBooksList').html()),

        initialize: function (options) {
            this.appState = options.appState;

            this.$books = this.$el.find('.settings.books');

            this.$el.find('.books .fe > div').html(this.templateBooksList());

            this.listenTo(this.appState, 'change:packageDocument', this.onPackageDocumentChange);
        },

        onPackageDocumentChange: function (appState, packageDocument) {
            var meta = packageDocument.getMetadata();
            console.log('meta: %o', meta);
            this.$el.find('.headerContainer h1').html(meta.title + '<span>' + (meta.creator || meta.author || '') + '</span>');
            this.hidePopover();
        },

        onBooksIconClick: function (e) {
            e.preventDefault();
            this.togglePopover();
        },

        togglePopover: function () {
            this.$books.toggleClass('active');
        },

        hidePopover: function () {
            this.$books.removeClass('active');
        }

    });
});