(function () {

    'use strict';

    var UISubMenu = function UISubMenu(element) {
        this.init(element);
    };

    UISubMenu.prototype.initSubmenuStructure = function(submenu) {
        var submenuContainers = submenu.getElementsByTagName('div');
        var submenuButtons = submenu.getElementsByTagName('a');
        var submenuLabels = submenu.getElementsByTagName('span');

        for(var c = 0; c < submenuContainers.length; c++) {
            submenuContainers[c].classList.add('ui-submenu-element-container');
        }
        for(var b = 0; b < submenuButtons.length; b++) {
            submenuButtons[b].classList.add('ui-submenu-element');
            submenuButtons[b].classList.add('ui-submenu-btn');
        }
        for(var l = 0; l < submenuLabels.length; l++) {
            submenuLabels[l].classList.add('ui-submenu-element-label');
        }
    };

    UISubMenu.prototype.initOpenSubmenuButtons = function () {
        var openSubmenuButtons = document.documentElement.getElementsByClassName('ui-open-submenu-btn');

        for (var b = 0; b < openSubmenuButtons.length; b++) {
            openSubmenuButtons[b].addEventListener('click', this.onOpenSubMenu);
        }
    };

    UISubMenu.prototype.initSubmenuButtons = function (submenu) {
        var submenuButtons = submenu.getElementsByClassName('ui-submenu-btn');

        for (var b = 0; b < submenuButtons.length; b++) {
            submenuButtons[b].addEventListener('click', this.onButtonClick);
        }
    };

    UISubMenu.prototype.onOpenSubMenu = function (e) {
        var submenu = document.getElementsByClassName('ui-submenu')[0];

        if (submenu.classList.contains('ui-submenu-active')) {
            ui.menuService.closeSubMenu();
        } else {
            e.target.offsetParent.classList.remove('ui-sidebar-active');
            ui.menuService.openSubMenu();
        }

        e.preventDefault();
    };

    UISubMenu.prototype.onButtonClick = function (e) {

        //Parse HREF
        var href = this.getAttribute('href');
        ui.menuService.closeSubMenu();
    };

    UISubMenu.prototype.mouseleave = function (e) {
        ui.menuService.closeSubMenu();
    };

    UISubMenu.prototype.init = function (submenu) {
        submenu.ui = self;

        this.initSubmenuStructure(submenu);
        this.initOpenSubmenuButtons(submenu);
        this.initSubmenuButtons(submenu);
        submenu.addEventListener('mouseleave', this.mouseleave);
    };

    ui.register(UISubMenu, 'ui-submenu', 'submenu');
    ui.submenu = UISubMenu;

})();