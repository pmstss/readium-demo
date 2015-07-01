/*global require, LookUp*/

require(['jquery', 'backbone', 'handlebars'], function ($, Backbone, Handlebars) {
    'use strict';

    LookUp.views.DocTOCView = Backbone.View.extend({
        appState: null,

        events: {
            'click .circle': 'onTocIconClick',
            'click li > div': 'onItemIconClick',
            'click li > p': 'onItemClick'
        },

        templateTOCItemList: Handlebars.compile($('#templateTOCItemList').html()),
        templateTOCItemContent: Handlebars.compile($('#templateTOCItemContent').html()),

        initialize: function (options) {
            this.appState = options.appState;

            this.$tocContent = this.$el.find('.content');

            this.listenTo(this.appState, 'change:book', function (appState, book) {
                book.loaded.navigation.then(function (items) {
                    console.log('toc: %o', items);
                    this.renderTOC(items);
                }.bind(this));
            });

            $(document).on('CustomResize', this.adjustPopoverSize.bind(this));
            this.adjustPopoverSize();
        },

        adjustPopoverSize: function () {
            var h = $(window).height() - 140;
            var w = $(window).width() * 0.37;
            this.$el.find('.fe > div').css({
                width: w + 'px',
                height: h + 'px'
            });
        },

        onTocIconClick: function (e) {
            e.preventDefault();
            $(e.currentTarget).closest('.toc').toggleClass('active');
        },

        renderTOC: function (items) {
            this.$tocContent.html(this.templateTOCItemList({
                items: this.renderTOCItems(items, 0),
                level: 0
            }));
        },

        renderTOCItems: function (items, level) {
            return items.map(function (tocItem) {
                var itemHtml = this.templateTOCItemContent($.extend(tocItem));
                var leaf = !tocItem.subitems || tocItem.subitems.length === 0;
                if (!leaf) {
                    itemHtml += this.templateTOCItemList({
                        items: this.renderTOCItems(tocItem.subitems, level + 1),
                        level: level + 1
                    });
                }
                return {
                    html: itemHtml,
                    leaf: leaf
                };
            }.bind(this));
        },

        onItemIconClick: function (e) {
            var $li = $(e.target).closest('li');
            $li.toggleClass('act');
            $li.children('ul').toggle();
        },

        onItemClick: function (e) {
            this.appState.get('book').gotoHref($(e.target).attr('data-dst'));
        }
    });
});
