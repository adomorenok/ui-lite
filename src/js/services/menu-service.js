(function () {

    'use strict';

    function openSubMenu() {
        var submenu = document.getElementsByClassName('ui-submenu')[0],
            container = document.getElementsByClassName('ui-container')[0],
            sidebar = document.getElementsByClassName('ui-sidebar')[0];

        submenu.classList.add('ui-submenu-active');
        if (submenu.classList.contains('ui-submenu-left')) {
            container.classList.add('ui-container-has-left-open-submenu');
        } else {
            container.classList.add('ui-container-has-right-open-submenu');
        }
        if (sidebar) {
            sidebar.classList.add('ui-sidebar-hidden');
        }

        addCloseEventByClickOnSubmenu();
    }

    function closeSubMenu() {
        var submenu = document.getElementsByClassName('ui-submenu')[0],
            container = document.getElementsByClassName('ui-container')[0],
            sidebar = document.getElementsByClassName('ui-sidebar')[0];

        if (sidebar) {
            sidebar.classList.remove('ui-sidebar-hidden');
        }
        submenu.classList.remove('ui-submenu-active');
        submenu.classList.add('ui-submenu-hidden');

        if (submenu.classList.contains('ui-submenu-left')) {
            container.classList.remove('ui-container-has-left-open-submenu');
        } else {
            container.classList.remove('ui-container-has-right-open-submenu');
        }

        setTimeout(function () {
            submenu.classList.remove('ui-submenu-hidden');
        }, 150);

        document.documentElement.removeEventListener('click', closeSubMenu, true);
    }

    function closePanel(e) {
        document.getElementsByClassName('ui-panel')[0].classList.remove('ui-panel-active');
        document.documentElement.removeEventListener('click', closePanel, true);
    }

    function addCloseEventByClickOnSubmenu() {
        document.documentElement.addEventListener('click', closeSubMenu, true);
    }

    function addCloseEventByClickOnPanel() {
        ui.onReady(function() {
            document.getElementsByClassName('ui-panel')[0].classList.add('ui-panel-active');
            document.documentElement.addEventListener('click', closePanel, true);
        });
    }

    var menuService = (function () {
        return {
            closeSubMenu: closeSubMenu,
            openSubMenu: openSubMenu,
            addCloseEventByClickOnSubmenu: addCloseEventByClickOnSubmenu,
            addCloseEventByClickOnPanel: addCloseEventByClickOnPanel
        };
    })();

    window.menuService = menuService;
})();

		