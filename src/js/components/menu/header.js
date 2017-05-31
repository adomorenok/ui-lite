(function () {

    'use strict';

    var UIHeader = function UIHeader(element) {
        this.init(element);
    };

    UIHeader.prototype.initScrollEvent = function (e) {
        ui.eventService.scrollHeader();
    };

    UIHeader.prototype.setHeaderScroll = function () {
        var mobileToggleBtns = document.documentElement.getElementsByClassName('ui-mobile-toggle');
        for (var i = 0; i < mobileToggleBtns.length; i++) {
            if (document.body.scrollTop > 44 || document.documentElement.scrollTop > 44) {
                mobileToggleBtns[i].style.display = 'block';
            } else {
                mobileToggleBtns[i].style.display = 'none';
            }
        }
    };

    UIHeader.prototype.init = function (header) {
        header.ui = this;

        this.initScrollEvent();

        window.addEventListener('resize', this.initScrollEvent);
    };

    ui.register(UIHeader, 'ui-header', 'header');
    ui.header = UIHeader;

})();