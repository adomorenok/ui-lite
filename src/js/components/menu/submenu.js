(function () {

    'use strict';

    var UISubMenu = function UISubMenu(element) {
        this.init(element);
    };

    UISubMenu.prototype.initScrollEvent = function(submenu) {
        if(submenu && !ui.resolutionService.isMobile()) {
            ui.menuService.setMenuScroll();
        }

        ui.eventService.scrollMenu();
    };

    UISubMenu.prototype.init = function (submenu) {
        submenu.ui = self;

        this.initScrollEvent(submenu);
    };

    ui.register(UISubMenu, 'ui-submenu', 'submenu');
    ui.submenu = UISubMenu;

})();