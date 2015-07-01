/*global LookUp*/

(function () {
    'use strict';

    LookUp.BrowserUtils = {
        doesSupportFullScreen: (function () {
            var res = document.documentElement.requestFullscreen || document.documentElement.msRequestFullscreen ||
                document.documentElement.mozRequestFullScreen || document.documentElement.webkitRequestFullscreen;
            return function () {
                return res;
            };
        })(),

        enterFullScreen: function () {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        },

        exitFullScreen: function () {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    };
})();
