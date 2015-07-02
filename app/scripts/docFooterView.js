/*global require, LookUp*/

require(['jquery', 'backbone', 'handlebars', 'readiumSDK'], function ($, Backbone, Handlebars, ReadiumSDK) {
    'use strict';

    LookUp.views.DocFooterView = Backbone.View.extend({
        events: {
            'change input.currentPage': 'onCurrentPageUserChange',
            'keydown input.currentPage': 'onCurrentPageUserKeyChange',
            'mousedown .circle': 'dragStart'
        },

        templateFooterView: Handlebars.compile($('#templateFooterView').html()),

        initialize: function (options) {
            this.appState = options.appState;

            this.$el.html(this.templateFooterView());

            this.$spread = this.$el.find('.spread');
            this.$spread2 = this.$el.find('.spread2');
            this.$currentPageInput = this.$el.find('input.currentPage');
            this.$totalPages = this.$el.find('.totalPages');

            this.drag = null;
            this.$draggableItem = this.$el.find('.progress_scroll .circle');

            this.dragEndBinded = this.dragEnd.bind(this);
            this.doDragBinded = this.doDrag.bind(this);

            this.listenTo(this.appState, 'change:readium', this.onReadiumChange);

            this.positionInfo = {};
        },

        onReadiumChange: function (appState, readium) {
            readium.reader.on(ReadiumSDK.Events.PAGINATION_CHANGED, function (info) {
                var pageInfo = info.paginationInfo.openPages[0];
                this.positionInfo = {
                    totalChapters: info.paginationInfo.spineItemCount,
                    chapterIdx: pageInfo.spineItemIndex,
                    chapterPagesTotal: pageInfo.spineItemPageCount,
                    chapterPageIdx: pageInfo.spineItemPageIndex
                };
                //console.log('position info: %o', this.positionInfo);
                this.onPageChange();
            }.bind(this));
        },

        getPagesTotal: function () {
            // return LookUp.router.appState.get('readium').reader.getLoadedSpineItems().length;
            return this.positionInfo.totalChapters;
        },

        setPageNum: function (pageNum) {
            //return LookUp.router.appState.get('readium').reader.openPageIndex(pageNum - 1);
            var reader = LookUp.router.appState.get('readium').reader;
            return reader.openSpineItemPage(reader.spine().item(pageNum - 1).idref);
        },

        getPageNum: function () {
            return this.positionInfo.chapterIdx + 1;
        },

        onPageChange: function () {
            var pageNum = this.getPageNum();
            this.$spread.html(pageNum);
            this.$spread2.hide();
            this.$spread.show();

            var totalPages = this.getPagesTotal();

            this.$draggableItem.css('left', 'calc(' + (pageNum - 1) / (totalPages - 1) * 100 + '%)');
            this.$currentPageInput.val(pageNum);
            this.$totalPages.html(this.getPagesTotal());
        },

        onCurrentPageUserChange: function (e) {
            var pageNum = $(e.target).val();
            if (!isNaN(pageNum) && pageNum > 0 && pageNum <= this.getPagesTotal()) {
                this.setPageNum(pageNum);
            } else {
                $(this).val(this.getPageNum());
            }
        },

        onCurrentPageUserKeyChange: function (e) {
            if ((e.keyCode || e.which) === 13) {
                var pageNum = $(e.target).val();
                if (!isNaN(pageNum) && pageNum > 0 && pageNum <= this.getPagesTotal()) {
                    this.setPageNum(pageNum);
                } else {
                    $(this).val(this.getPageNum());
                }
            }
        },

        dragStart: function (e) {
            if (!this.appState.get('readium')) {
                return;
            }

            this.drag = {
                mouseStartX: e.clientX,
                total: this.$el.find('.line').width() - 26,
                elementStartPos: this.$draggableItem.position().left
            };

            this.updateDrag(this.drag.elementStartPos / this.drag.total * 100);

            $(document).bind('mouseup', this.dragEndBinded);
            $(document).bind('mousemove', this.doDragBinded);
        },

        dragEnd: function () {
            if (!this.drag) {
                return;
            }

            if (this.drag.pageNum) {
                this.setPageNum(this.drag.pageNum);
            }

            this.drag = null;

            $(document).unbind('mouseup', this.dragEndBinded);
            $(document).unbind('mousemove', this.doDragBinded);
        },

        doDrag: function (e) {
            if (this.drag) {
                this.updateDrag((this.drag.elementStartPos + e.clientX - this.drag.mouseStartX) / this.drag.total * 100);
                e.stopImmediatePropagation();
                e.preventDefault();
            }
        },

        updateDrag: function (value) {
            if (value >= 0 && value <= 100) {
                var pageNum = Math.round((this.getPagesTotal() - 1) * value / 100) + 1;

                this.$draggableItem.css('left', value + '%');

                if (pageNum !== this.drag.pageNum) {
                    this.drag.pageNum = pageNum;
                }
            }
        }
    });
});
