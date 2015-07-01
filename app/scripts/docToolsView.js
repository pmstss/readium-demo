/*global require, LookUp*/

require(['jquery', 'backbone'], function ($, Backbone) {
    'use strict';

    LookUp.views.DocToolsView = Backbone.View.extend({
        appState: null,

        events: {
            'click .toolsSlider': 'togglePanel',
            'click a.tool_tb': 'onToolbarsSwitchClick',
            'click a.tool_zoom_in': 'onZoomInClick',
            'click a.tool_zoom_out': 'onZoomOutClick',
            'click a.tool_marker': 'onSelectTextIconClick',
            'click a.tool_drag_page': 'onDragIconClick',
            'click a.tool_fullscreen': 'onFullscreenIconClick',
            'click a.tool_expand': 'onFitIconClick'
        },

        initialize: function (options) {
            this.appState = options.appState;

            if (!LookUp.BrowserUtils.doesSupportFullScreen()) {
                this.$el.find('li.tool_fullscreen').addClass('disabled');
            }

            this.listenTo(this.appState, 'change:toolbarsVisible', this.onToolbarsVisibleChange);
            this.listenTo(this.appState, 'change:fullscreen', this.onFullscreenChange);
            this.listenTo(this.appState, 'change:wordsMode', this.onWordsModeChange);
            this.listenTo(this.appState, 'change:zoom', this.onZoomChange);

            document.addEventListener('fullscreenchange', this.onFullscreenBrowserChange.bind(this), false);
            document.addEventListener('mozfullscreenchange', this.onFullscreenBrowserChange.bind(this), false);
            document.addEventListener('webkitfullscreenchange', this.onFullscreenBrowserChange.bind(this), false);
            document.addEventListener('msfullscreenchange', this.onFullscreenBrowserChange.bind(this), false);
        },

        togglePanel: function () {
            this.$el.toggleClass('in').toggleClass('out');
        },

        onToolbarsSwitchClick: function (e) {
            e.preventDefault();
            this.appState.set('toolbarsVisible', !this.appState.get('toolbarsVisible'));
        },

        onSelectTextIconClick: function (e) {
            e.preventDefault();
            this.appState.set('wordsMode', true);
        },

        onDragIconClick: function (e) {
            e.preventDefault();
            this.appState.set('wordsMode', false);
        },

        onFullscreenIconClick: function (e) {
            e.preventDefault();

            if ($(e.currentTarget).closest('li').hasClass('disabled')) {
                return;
            }

            if (this.appState.get('fullscreen')) {
                LookUp.BrowserUtils.exitFullScreen();
            } else {
                LookUp.BrowserUtils.enterFullScreen();
            }
        },

        /*** Model events ***/

        onToolbarsVisibleChange: function (appState, toolbarsVisible) {
            var $li = this.$el.find('li:has(a.tool_tb)');
            $li.toggleClass('invert', !toolbarsVisible);
            var $tool = $li.find('a.tool_tb');
            $tool.attr('title', $tool.data('title-' + toolbarsVisible));
        },

        onFullscreenChange: function (appState, fullscreen) {
            var $li = this.$el.find('li:has(a.tool_fullscreen)');
            $li.toggleClass('invert', fullscreen);
            var $tool = $li.find('a.tool_fullscreen');
            $tool.attr('title', $tool.data('title-' + fullscreen));
        },

        onFullscreenBrowserChange: function () {
            // logic based on assumption, that on page load it was not a fullscreen.
            // otherwise we need reliable detection is browser currently in fullscreen or not,
            // but chrome doesn't support anything helpful from https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode
            this.appState.set('fullscreen', !this.appState.get('fullscreen'));
        },

        onWordsModeChange: function (appState, wordsMode) {
            var $li = wordsMode ? this.$el.find('li:has(a.tool_marker)') : this.$el.find('li:has(a.tool_drag_page)');
            $li.siblings('li').removeClass('active');
            $li.addClass('active');
        },

        onZoomInClick: function (e) {
            e.preventDefault();
            this.appState.zoomIn();
        },

        onZoomOutClick: function (e) {
            e.preventDefault();
            this.appState.zoomOut();
        },

        onZoomChange: function (appState, zoom) {
            this.$el.find('li.tool_zoom_out').toggleClass('disabled', Math.abs(zoom - appState.ZOOM_MAX) < 0.5);
            this.$el.find('li.tool_zoom_in').toggleClass('disabled', Math.abs(zoom - appState.ZOOM_MIN) < 0.5);
        },

        onFitIconClick: function (e) {
            e.preventDefault();
            this.appState.resetZoom();
        }
    });
});
