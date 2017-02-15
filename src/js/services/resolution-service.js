(function() {

	'use strict';

	var MOBILEWIDTH = 480; //Max mobile width

	var resolutionService = {

		getScreenWidth : function() {
			return (window.innerWidth > 0) ? window.innerWidth : screen.width;
		},

		isMobile : function() {
			return this.getScreenWidth() < (MOBILEWIDTH + 1) ? true : false;
		}
	};

	window.resolutionService = resolutionService;
})();

		