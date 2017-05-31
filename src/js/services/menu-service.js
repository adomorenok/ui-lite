(function () {

    'use strict';

    function openSubMenu(submenu) {
        submenu.classList.add('ui-submenu-active');

        addCloseEventByClickOnSubmenu();
    }

    function closeSubMenu() {
        var submenuList = document.documentElement.getElementsByClassName('ui-submenu');
        for (var i = 0; i < submenuList.length; i++) {
            submenuList[i].classList.remove('ui-submenu-active');
        }

        document.documentElement.removeEventListener('click', closeSubMenu, true);
    }

    function closePanel(e) {
        removeClassToElements(document.documentElement.getElementsByClassName('ui-header'), 'active');
        removeClassToElements(document.documentElement.getElementsByClassName('ui-panel'), 'ui-panel-active');
        document.documentElement.removeEventListener('click', closePanel, true);
    }

    function addCloseEventByClickOnSubmenu() {
        document.documentElement.addEventListener('click', closeSubMenu, true);
    }

    function addCloseEventByClickOnPanel() {
        ui.onReady(function () {
            addClassToElements(document.documentElement.getElementsByClassName('ui-panel'), 'ui-panel-active');
            document.documentElement.addEventListener('click', closePanel, true);
        });
    }

    function setMenuScroll() {
        var scroll = document.body.scrollTop || document.documentElement.scrollTop;
        var menuElements = getMenuElements();

        var i;
        for (i = 0; i < menuElements.sidebars.length; i++) {
            addPadding(menuElements.sidebars[i], scroll);
        }
        for (i = 0; i < menuElements.submenu.length; i++) {
            addPadding(menuElements.submenu[i], scroll);
        }
    }

    function addPadding(e, scroll) {
        if (scroll < 64) {
            setPaddingTop(e, (64 - scroll) + 'px');
        } else {
            setPaddingTop(e, 0);
        }
    }

    function removePadding() {
        var menuElements = getMenuElements();

        var i;
        for (i = 0; i < menuElements.sidebars.length; i++) {
            setPaddingTop(menuElements.sidebars[i], 0);
        }
        for (i = 0; i < menuElements.submenu.length; i++) {
            setPaddingTop(menuElements.submenu[i], 0);
        }
    }

    function setPaddingTop(element, padding) {
        if (element) {
            element.style.paddingTop = padding;
        }
    }

    function getMenuElements() {
        return {
            sidebars: document.documentElement.getElementsByClassName('ui-sidebar'),
            submenu: document.documentElement.getElementsByClassName('ui-submenu')
        };
    }

    function addClassToElements(elements, clazz) {
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.add(clazz);
        }
    }

    function removeClassToElements(elements, clazz) {
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove(clazz);
        }
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

		