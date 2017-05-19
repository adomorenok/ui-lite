(function () {

    'use strict';

    function openSubMenu() {
        var submenu = document.getElementsByClassName('ui-submenu')[0];
        submenu.classList.add('ui-submenu-active');

        addCloseEventByClickOnSubmenu();
    }

    function closeSubMenu() {
        var submenu = document.documentElement.getElementsByClassName('ui-submenu')[0];
        submenu.classList.remove('ui-submenu-active');

        document.documentElement.removeEventListener('click', closeSubMenu, true);
    }

    function closePanel(e) {
        document.documentElement.getElementsByClassName('ui-header')[0].classList.remove('active');
        document.documentElement.getElementsByClassName('ui-panel')[0].classList.remove('ui-panel-active');
        document.documentElement.removeEventListener('click', closePanel, true);
    }

    function addCloseEventByClickOnSubmenu() {
        document.documentElement.addEventListener('click', closeSubMenu, true);
    }

    function addCloseEventByClickOnPanel() {
        ui.onReady(function() {
            document.documentElement.getElementsByClassName('ui-panel')[0].classList.add('ui-panel-active');
            document.documentElement.addEventListener('click', closePanel, true);
        });
    }

    function setMenuScroll() {
        var scroll = document.body.scrollTop || document.documentElement.scrollTop;
        var menuElements = getMenuElements();

        if(menuElements.sidebar) addPadding(menuElements.sidebar, scroll);
        if(menuElements.submenu) addPadding(menuElements.submenu, scroll);
    }

    function addPadding(e, scroll) {
        if(scroll < 64) {
            e.style.paddingTop = (64 - scroll) + 'px';
        } else {
            e.style.paddingTop = 0;
        }
    }

    function removePadding() {
        var menuElements = getMenuElements();

        if(menuElements.sidebar) {
            menuElements.sidebar.style.paddingTop = 0;
        }
        if(menuElements.submenu) {
            menuElements.submenu.style.paddingTop = 0;
        }
    }

    function getMenuElements() {
        return {
            sidebar: document.documentElement.getElementsByClassName('ui-sidebar')[0],
            submenu: document.documentElement.getElementsByClassName('ui-submenu')[0]
        };
    }

    var menuService = (function () {
        return {
            closeSubMenu: closeSubMenu,
            openSubMenu: openSubMenu,
            setMenuScroll: setMenuScroll,
            removePadding: removePadding,
            addCloseEventByClickOnSubmenu: addCloseEventByClickOnSubmenu,
            addCloseEventByClickOnPanel: addCloseEventByClickOnPanel
        };
    })();

    ui.menuService = menuService;
})();

		