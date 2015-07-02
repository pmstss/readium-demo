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

            this.listenTo(this.appState, 'change:packageDocument', function (appState, packageDocument) {
                packageDocument.generateTocListDOM(function (dom) {
                    console.log('dom from generateTocListDOM(): %o', dom);
                    var parsedItems = this.parseTocObjFromXml($(dom).find('nav[epub\\:type="toc"]'));
                    console.log('parsedItems: %o', parsedItems.inners);
                    this.renderTOC(parsedItems.inners);
                }.bind(this));
            });

            $(document).on('CustomResize', this.adjustPopoverSize.bind(this));
            this.adjustPopoverSize();
        },

        parseTocObjFromXml: function($el) {
            var $ol = $el.children('ol');
            var $a = $el.children('a');
            if ($ol.length) {
                var res = [];
                var self = this;
                $ol.children('li').each(function () {
                   res.push(self.parseTocObjFromXml($(this)));
                });
                return {
                    label: $a.text(),
                    href: $a.attr('href'),
                    inners: res
                };
            } else {
                if ($el.get(0).tagName.toLowerCase() !== 'li') {
                    console.log('### not ol and not li: %o', $el);
                    return {};
                }

                return {
                    label: $a.text(),
                    href: $a.attr('href')
                };
            }
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
            console.log('data-dst: %o', $(e.target).attr('data-dst'));
            //TODO clarify about differences between href and conrentUrl here
            if (!this.appState.get('readium').reader.openContentUrl($(e.target).attr('data-dst'))) {
                this.appState.get('readium').reader.openContentUrl('xhtml/' + $(e.target).attr('data-dst'));
            }
        }
    });
});
