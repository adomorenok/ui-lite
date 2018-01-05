(function () {

    'use strict';

    function openSubMenu(submenu) {
        submenu.classList.add('ui-submenu-active');
        addCloseEventForSubmenu(submenu);
    }

    function closeSubMenu() {
        var submenuList = document.documentElement.getElementsByClassName('ui-submenu');
        for (var i = 0; i < submenuList.length; i++) {
            submenuList[i].classList.remove('ui-submenu-active');
        }
        var sidebar = document.documentElement.getElementsByClassName('ui-sidebar-small');
        for (var s = 0; s < sidebar.length; s++) {
            sidebar[s].classList.remove('ui-sidebar-small');
        }

        document.documentElement.removeEventListener('click', closeSubMenu, true);
    }

    function closePanel(e) {
        removeClassToElements(document.documentElement.getElementsByClassName('ui-header'), 'active');
        removeClassToElements(document.documentElement.getElementsByClassName('ui-panel'), 'ui-panel-active');
        document.documentElement.removeEventListener('click', closePanel, true);
    }

    function addCloseEventForSubmenu(submenu) {
        if (!submenu.classList.contains('ui-submenu__pinned-mode')) {
            submenu.addEventListener('mouseleave', closeSubMenu);
        }

        var closeIcons = submenu.getElementsByClassName('ui-submenu__close-icon');
        for (var i = 0; i < closeIcons.length; i++) {
            closeIcons[i].addEventListener('click', closeSubMenu, true);
        }

        var elements = submenu.getElementsByClassName('ui-submenu-element-container');
        for (i = 0; i < elements.length; i++) {
            elements[i].addEventListener('click', closeSubMenu, true);
        }

        var sidebars = document.getElementsByClassName('ui-sidebar');

        for (i = 0; i < sidebars.length; i++) {
            var submenuElements = sidebars[i].getElementsByClassName('ui-sidebar-element-container');
            for (var j = 0; j < submenuElements.length; j++) {
                submenuElements[j].addEventListener('click', closeSubMenu, true);
            }
        }
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

    ui.menuService = (function () {
        return {
            closeSubMenu: closeSubMenu,
            openSubMenu: openSubMenu,
            setMenuScroll: setMenuScroll,
            removePadding: removePadding,
            addCloseEventForSubmenu: addCloseEventForSubmenu,
            addCloseEventByClickOnPanel: addCloseEventByClickOnPanel
        };
    })();
})();

		