define(['jquery', 'backbone', 'handlebars', 'lu-model-state'], function ($, Backbone, Handlebars, appState) {
    'use strict';

    return Backbone.View.extend({
        events: {
            'click .books .circle': 'onBooksIconClick'
        },

        templateBooksList: Handlebars.compile($('#templateBooksList').html()),

        initialize: function () {
            this.$books = this.$el.find('.settings.books');

            this.$el.find('.books .fe > div').html(this.templateBooksList());

            this.listenTo(appState, 'change:packageDocument', this.onPackageDocumentChange);
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