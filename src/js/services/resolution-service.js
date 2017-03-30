(function () {

    'use strict';

    var MOBILEWIDTH = 670; //Max mobile width
    var TABLETWIDTH = 880; //Max mobile width

    var resolutionService = {

        getScreenWidth: function () {
            return (window.innerWidth > 0) ? window.innerWidth : screen.width;
        },

        isMobile: function () {
            return this.getScreenWidth() < (MOBILEWIDTH + 1) ? true : false;
        },

        isTablet: function () {
            return this.getScreenWidth() < (TABLETWIDTH + 1) ? true : false;
        }
    };

    window.resolutionService = resolutionService;
    window.MOBILEWIDTH = MOBILEWIDTH;
    window.TABLETWIDTH = TABLETWIDTH;
})();

		