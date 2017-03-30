(function () {

    'use strict';

    var container,
        submenu,
        sidebar;

    var UISubMenu = function UISubMenu(element) {
        this.init(element);
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
        if (submenu.classList.contains('ui-submenu-active')) {
            menuService.closeSubMenu();
        } else {
            menuService.openSubMenu();
        }

        e.preventDefault();
    };

    UISubMenu.prototype.onButtonClick = function (e) {

        //Parse HREF
        var href = this.getAttribute('href');

        if (href) {
            console.log(href);
        }

        e.preventDefault();
    };

    UISubMenu.prototype.mouseover = function (e) {

        if (submenu.classList.contains('ui-submenu-left')) {
            container.classList.add('ui-container-has-left-open-submenu');
        } else {
            container.classList.add('ui-container-has-right-open-submenu');
        }

        if (sidebar) {
            sidebar.classList.add('ui-sidebar-hidden');
        }
    };

    UISubMenu.prototype.mouseout = function (e) {

        if (submenu.classList.contains('ui-submenu-left')) {
            container.classList.remove('ui-container-has-left-open-submenu');
        } else {
            container.classList.remove('ui-container-has-right-open-submenu');
        }

        submenu.classList.remove('ui-submenu-active');

        if (sidebar) {
            setTimeout(function () {
                sidebar.classList.remove('ui-sidebar-hidden');
            }, 150);
        }
    };

    UISubMenu.prototype.resize = function (e) {

        if (!resolutionService.isMobile()) {
            if (!container.classList.contains('ui-container-has-left-submenu') && submenu.classList.contains('ui-submenu-left')) {
                container.classList.add('ui-container-has-left-submenu');
            } else if (!container.classList.contains('ui-container-has-right-submenu') && submenu.classList.contains('ui-submenu-right')) {
                container.classList.add('ui-container-has-right-submenu');
            }
        } else {
            if (container.classList.contains('ui-container-has-left-submenu') && submenu.classList.contains('ui-submenu-left')) {
                container.classList.remove('ui-container-has-left-submenu');
            } else if (container.classList.contains('ui-container-has-right-submenu') && submenu.classList.contains('ui-submenu-right')) {
                container.classList.remove('ui-container-has-right-submenu');
            }
        }
    };

    UISubMenu.prototype.init = function (_submenu) {
        _submenu.ui = this;
        submenu = _submenu;
        container = document.getElementsByClassName('ui-container')[0];
        sidebar = document.getElementsByClassName('ui-sidebar')[0];

        this.initOpenSubmenuButtons(submenu);
        this.initSubmenuButtons(submenu);

        _submenu.addEventListener('mouseover', this.mouseover);
        _submenu.addEventListener('mouseout', this.mouseout);

        window.addEventListener('resize', this.resize);
    };

    ui.register(UISubMenu, 'ui-submenu', 'submenu');
    ui.submenu = UISubMenu;

})();