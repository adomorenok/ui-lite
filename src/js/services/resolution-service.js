(function () {

    'use strict';

    var MOBILE_WIDTH = 470; //Max mobile width
    var TABLET_WIDTH = 880; //Max tablet width

    var uiResolutionService = {
        getScreenWidth: function () {
            return (window.innerWidth > 0) ? window.innerWidth : screen.width;
        },

        isMobile: function () {
            return this.getScreenWidth() < (MOBILE_WIDTH + 1);
        },

        isTablet: function () {
            return this.getScreenWidth() < (TABLET_WIDTH + 1);
        },

        isFullScreen: function () {
            return this.getScreenWidth() > TABLET_WIDTH;
        }
    };

    ui.resolutionService = uiResolutionService;
    ui.MOBILE_WIDTH = MOBILE_WIDTH;
    ui.TABLETWIDTH = TABLET_WIDTH;
})();

		