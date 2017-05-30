(function () {

    'use strict';

    var UISidebar = function UISidebar(element) {
        this.init(element);
    };

    UISidebar.prototype.initScrollEvent = function(sidebar) {
        if(sidebar && !ui.resolutionService.isMobile()) {
            ui.menuService.setMenuScroll();
        }

        ui.eventService.scrollMenu();
    };

    UISidebar.prototype.init = function (sidebar) {
        sidebar.ui = this;

        this.initScrollEvent(sidebar);
        window.addEventListener('resize', this.initScrollEvent);
    };

    ui.register(UISidebar, 'ui-sidebar', 'sidebar');
    ui.sidebar = UISidebar;

})();