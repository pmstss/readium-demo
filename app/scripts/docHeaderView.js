/*global require, LookUp*/

require(['jquery', 'backbone', 'handlebars'], function ($, Backbone, Handlebars) {
    'use strict';

    LookUp.views.DocHeaderView = Backbone.View.extend({
        events: {
            'change .loadEpub': 'onFileSelect',
            'click .books .circle': 'onBooksIconClick'
        },

        templateBooksList: Handlebars.compile($('#templateBooksList').html()),

        initialize: function (options) {
            this.appState = options.appState;

            this.$el.find('.books .fe > div').html(this.templateBooksList());

            this.listenTo(this.appState, 'change:book', this.onBookChange);
        },

        onBookChange: function (appState, book) {
            book.loaded.metadata.then(function (meta) {
                console.log('meta: %o', meta);
                this.$el.find('.headerContainer h1').html(meta.title + '<span>' + meta.creator + '</span>');
            }.bind(this));
        },

        onBooksIconClick: function (e) {
            e.preventDefault();
            $(e.currentTarget).closest('.books').toggleClass('active');
        },

        onFileSelect: function (e) {
            var file = e.target.files[0];
            if (window.FileReader) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    this.appState.set('customBookData', {
                        name: file.name,
                        data: e.target.result
                    });
                }.bind(this);
                reader.readAsArrayBuffer(file);
            }
        }
    });
});