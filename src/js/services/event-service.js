;(function () {

    'use strict';

    var eventService = (function () {

        var activeEvents = {
            header: [],
            menu: []
        };

        function scrollHeader() {

            var headerActiveEvents = activeEvents.header;
            var index = headerActiveEvents.indexOf('scrollHeader');
            var mobileToggleBtn = document.documentElement.getElementsByClassName('ui-mobile-toggle')[0];
            if(ui.resolutionService.isMobile() || ui.resolutionService.isTablet()) {
                if(index === -1) {
                    window.addEventListener("scroll", ui.header.prototype.setHeaderScroll, false);
                    activeEvents.header.push('scrollHeader');
                }
                if (document.body.scrollTop > 64 || document.documentElement.scrollTop > 64) {
                    mobileToggleBtn.style.display = 'block';
                } else {
                    mobileToggleBtn.style.display = 'none';
                }
            } else {
                mobileToggleBtn.style.display = 'none';
                window.removeEventListener("scroll", ui.header.prototype.setHeaderScroll, false);
                if(index > -1) {
                    headerActiveEvents.splice(index, 1);
                }
            }
        }

        function scrollMenu() {

            var menuActiveEvents = activeEvents.menu;
            var index = headerActiveEvents.indexOf('scrollMenu');
            if(ui.resolutionService.isMobile() || ui.resolutionService.isTablet()) {
                if(index === -1) {
                    window.addEventListener("scroll", menuService.setMenuScroll, false);
                    activeEvents.header.push('scrollMenu');
                }
            } else {
                window.removeEventListener("scroll", menuService.setMenuScroll, false);
                if(index > -1) {
                    menuActiveEvents.splice(index, 1);
                }
            }
        }

        return {
            scrollHeader: scrollHeader,
            scrollMenu: scrollMenu
        };
    })();

    ui.eventService = eventService;
}());