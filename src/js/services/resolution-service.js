(function () {

    'use strict';

	var MOBILEWIDTH = 470; //Max mobile width
	var TABLETWIDTH = 880; //Max mobile width

    var uiResolutionService = {

        getScreenWidth: function () {
            return (window.innerWidth > 0) ? window.innerWidth : screen.width;
        },

        isMobile: function () {
            return this.getScreenWidth() < (MOBILEWIDTH + 1) ? true : false;
        },

        isTablet: function () {
            return this.getScreenWidth() < (TABLETWIDTH + 1) ? true : false;
        },

        isFullScreen: function () {
            return this.getScreenWidth() > TABLETWIDTH ? true : false;
        }
    };

    ui.resolutionService = uiResolutionService;
    ui.MOBILEWIDTH = MOBILEWIDTH;
    ui.TABLETWIDTH = TABLETWIDTH;
})();

		