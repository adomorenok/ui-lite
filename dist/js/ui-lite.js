(function () {

    'use strict';

    var ui = {};

    ui.componentService = {
        components: [],

        register: function (componentName, className) {
            this.components.push({
                name: componentName,
                className: className
            });
        },

        initAllComponents: function () {
            for (var i = 0; i < this.components.length; i++) {
                this.initComponents(this.components[i]);
            }
        },

        initComponents: function (component) {
            var elements = document.getElementsByClassName(component.className);

            for (var i = 0; i < elements.length; i++) {
                new ui[component.name](elements[i]);
            }
        }
    };

    ui.register = function (component, className, componentName) {
        ui[componentName] = component;
        ui.componentService.register(componentName, className);
    };

    ui.init = function () {
        ui.componentService.initAllComponents();
    };

    window.ui = ui;
})();

(function () {

    'use strict';

    var UiButton = function UiButton(element) {
        this.init(element);
    };

    UiButton.prototype.addRipleEffect = function (btn) {
        var span = document.createElement('span');
        span.classList.add('ui-btn-ripple-container');

        var spanRipple = document.createElement('span');
        spanRipple.classList.add('ui-ripple');
        span.appendChild(spanRipple);
        btn.appendChild(span);
    };

    UiButton.prototype.findRipple = function (clidNodes) {
        for (var j = 0; j < clidNodes.length; j++) {
            if (clidNodes[j].classList && clidNodes[j].classList.contains('ui-btn-ripple-container')) {
                return clidNodes[j].childNodes[0];
            }
        }
    };

    UiButton.prototype.mouseDown = function (e) {
        var btn = e.currentTarget,
            ripple = btn.ui.findRipple(btn.childNodes);

        if (!ripple) {
            return;
        }

        var width = btn.offsetWidth,
            height = btn.offsetHeight;

        ripple.classList.remove('ui-animate');

        var rippleSize = Math.sqrt(width * width + height * height) * 2 + 2;

        ripple.style.width = rippleSize + 'px';
        ripple.style.height = rippleSize + 'px';

        var scale = 'scale(0.0001, 0.0001) ';
        var offset = 'translate(' + e.offsetX + 'px, ' + e.offsetY + 'px) ';

        ripple.classList.add('ui-visible');
        ripple.style.transform = 'translate(-50%, -50%) ' + offset + scale;

        setTimeout(function () {
            ripple.classList.add('ui-animate');
        });
        setTimeout(function () {
            ripple.style.transform = 'translate(-50%, -50%) ' + offset;
        }, 100);
    };

    UiButton.prototype.mouseUp = function (e) {
        var btn = e.currentTarget,
            ripple = btn.ui.findRipple(btn.childNodes);

        if (ripple) {
            ripple.classList.remove('ui-visible');
        }
    };

    UiButton.prototype.init = function (btn) {
        btn.ui = this;

        this.addRipleEffect(btn);

        btn.addEventListener('mousedown', this.mouseDown);
        btn.addEventListener('mouseup', this.mouseUp);
        btn.addEventListener('mouseout', this.mouseUp);

    };

    ui.register(UiButton, 'ui-btn', 'button');
    ui.button = UiButton;

})();
(function () {

    'use strict';

    var UIContainer = function UIContainer(element) {
        this.init(element);
    };


    UIContainer.prototype.init = function (container) {
        container.ui = this;
    };

    ui.register(UIContainer, 'ui-container', 'container');
    ui.container = UIContainer;

})();

(function () {

    'use strict';

    var UIFooter = function UIFooter(element) {
        this.init(element);
    };

    UIFooter.prototype.init = function (footer) {
        footer.ui = this;
    };

    ui.register(UIFooter, 'ui-footer', 'footer');
    ui.footer = UIFooter;

})();
(function () {

    'use strict';

    var UiInput = function UiInput(element) {
        this.init(element);
    };

    UiInput.prototype.checkValue = function (input) {
        var parent = input.parentElement;

        if (input.value) {
            parent.classList.add('ui-has-value');
        } else {
            parent.classList.remove('ui-has-value');
        }
    };

    UiInput.prototype.onfocus = function (e) {
        var parent = e.target.parentElement;
        parent.classList.add('ui-on-focus');
    };

    UiInput.prototype.onblur = function (e) {
        var input = e.target,
            parent = input.parentElement;
        parent.classList.remove('ui-on-focus');

        this.ui.checkValue(input);
    };

    UiInput.prototype.getLabel = function (input) {
        var label = input.previousElementSibling;

        if (label && label.classList && label.classList.contains('ui-label')) {
            return label;
        }

        label = input.nextElementSibling;

        if (label && label.classList && label.classList.contains('ui-label')) {
            return label;
        }

        return null;
    };

    UiInput.prototype.init = function (input) {
        input.ui = this;

        this.checkValue(input);

        input.addEventListener('focus', this.onfocus);
        input.addEventListener('blur', this.onblur);

        var label = this.getLabel(input);

        if (label) {
            label.addEventListener('click', function () {
                input.focus();
                input.value = input.value;
            });
        }
    };

    ui.register(UiInput, 'ui-input', 'input');
    ui.input = UiInput;

})();

(function () {

    'use strict';

    var UIRadio = function UIRadio(element) {
        this.init(element);
    };


    UIRadio.prototype.init = function (radio) {
        radio.ui = this;
    };

    ui.register(UIRadio, 'ui-radio', 'radio');
    ui.radio = UIRadio;

})();

(function () {

    'use strict';

    var UiSelect = function UiSelect(element, list, label) {
        this.init(element, list, label);
    };

    UiSelect.prototype.checkValue = function (input) {
        var parent = input.parentElement;

        if (input.value) {
            parent.classList.add('ui-has-value');
        } else {
            parent.classList.remove('ui-has-value');
        }
    };

    UiSelect.prototype.upgrade = function (select) {
        var parent = select.parentElement;

        parent.classList.add('ui-upgraded');
    };

    UiSelect.prototype.addInput = function (select) {
        var parent = select.parentElement;

        var input = document.createElement('input');
        input.classList.add('ui-select-input');
        parent.appendChild(input);

        return input;
    };

    UiSelect.prototype.updateOptions = function (select, list, label) {
        if (!list) {
            return;
        }
        var i;
        for (i = select.childNodes.length - 1; i >= 0; i--) {
            select.removeChild(select.childNodes[i]);
        }

        for (i = 0; i < list.length; i++) {
            var option = document.createElement('option');
            option.value = i;
            option.uiValue = list[i];
            option.innerHTML = list[i][label];
            select.appendChild(option);
        }

    };

    UiSelect.prototype.generateList = function (select, input) {
        var parent = select.parentElement;

        var selectIcon = document.createElement('span');
        selectIcon.classList.add('ui-select-icon');
        selectIcon.addEventListener('click', function (e) {
            input.focus();
            input.value = input.value;
        });
        parent.appendChild(selectIcon);

        var list = document.createElement('div');
        list.classList.add('ui-select-options');

        var childNodes = select.options;
        for (var i = 0; i < childNodes.length; i++) {
            list.appendChild(this.createOption(childNodes[i], input, select));
        }

        parent.appendChild(list);
        input.selectList = list;
    };

    UiSelect.prototype.createOption = function (node, input, select) {
        var option = document.createElement('div');
        option.setAttribute('value', node.value);
        option.classList.add('ui-select-option');
        option.textContent = node.textContent;
        option.tabIndex = '0';
        option.addEventListener('click', function (e) {
            input.value = node.label;
            select.value = node.value;
            select.uiValue = node.uiValue;
            input.ui.checkValue(input);
            input.ui.closeSelect(input);
        });

        option.addEventListener('keydown', function (e) {
            var keyCode = e.which || e.keyCode;
            if (keyCode == 13) {
                input.value = node.label;
                select.value = node.value;
                select.uiValue = node.uiValue;
                input.ui.checkValue(input);
            } else if (keyCode == 40) {
                e.target.nextElementSibling.focus();
            } else if (keyCode == 38) {
                e.target.previousElementSibling.focus();
            } else if (keyCode == 27) {
                // close select
                input.ui.closeSelect(input);
            }
        });

        option.addEventListener('blur', function (e) {
            setTimeout(function () {
                if (!document.activeElement.classList || !document.activeElement.classList.contains('ui-select-option')) {
                    input.ui.closeSelect(input);
                }
            }, 0);
        });

        return option;
    };

    UiSelect.prototype.onfocus = function (e) {
        var input = e.target,
            parent = input.parentElement;

        parent.classList.add('ui-on-focus');
        input.selectList.classList.add('opening');
        setTimeout(function () {
            input.selectList.classList.add('is-opened');
            input.selectList.childNodes[0].focus();
        }, 0);

    };

    UiSelect.prototype.onblur = function (e) {
        var select = e.target,
            parent = select.parentElement;
        parent.classList.remove('ui-on-focus');

        this.ui.checkValue(select);
    };

    UiSelect.prototype.closeSelect = function (input) {
        var parent = input.parentElement;
        parent.classList.remove('ui-on-focus');
        input.selectList.classList.remove('is-opened');

        input.ui.checkValue(input);
    };

    UiSelect.prototype.getLabel = function (input) {
        var label = input.previousElementSibling;

        if (label && label.classList && label.classList.contains('ui-label')) {
            return label;
        }

        label = input.nextElementSibling;

        if (label && label.classList && label.classList.contains('ui-label')) {
            return label;
        }

        return null;
    };

    UiSelect.prototype.getValue = function () {
        console.log(this);
    };

    UiSelect.prototype.init = function (select, list, label) {
        this.updateOptions(select, list, label);
        this.upgrade(select);
        var input = this.addInput(select);
        this.checkValue(input);
        this.generateList(select, input);

        input.addEventListener('focus', this.onfocus);
        input.addEventListener('blur', this.onblur);

        var selectLabel = this.getLabel(select);

        if (selectLabel) {
            selectLabel.addEventListener('click', function (e) {
                input.focus();
                input.value = input.value;
            });
        }

        select.ui = input.ui = this;
        select.ui.getValue = function () {
            console.log(select.uiValue);
        };
    };

    ui.register(UiSelect, 'ui-select', 'select');
    ui.select = UiSelect;

})();

(function () {

    'use strict';

    var eventService = (function () {

        var activeEvents = {
            header: [],
            menu: []
        };

        function scrollHeader() {
            var headerActiveEvents = activeEvents.header;
            var index = headerActiveEvents.indexOf('scrollHeader');
            var mobileToggleBtns = document.documentElement.getElementsByClassName('ui-mobile-toggle');

            if (ui.resolutionService.isMobile() || ui.resolutionService.isTablet()) {
                if (index === -1) {
                    window.addEventListener("scroll", ui.header.prototype.setHeaderScroll, false);
                    activeEvents.header.push('scrollHeader');
                }
                if (document.body.scrollTop > 64 || document.documentElement.scrollTop > 64) {
                    setButtonsStyle(mobileToggleBtns, {name: 'display', value: 'block'});
                } else {
                    setButtonsStyle(mobileToggleBtns, {name: 'display', value: 'none'});
                }
            } else {
                setButtonsStyle(mobileToggleBtns, {name: 'display', value: 'none'});
                window.removeEventListener("scroll", ui.header.prototype.setHeaderScroll, false);
                if (index > -1) {
                    headerActiveEvents.splice(index, 1);
                }
            }
        }

        function setButtonsStyle(buttons, style) {
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].style[style.name] = style.value;
            }
        }

        function scrollMenu() {
            var menuActiveEvents = activeEvents.menu;
            var index = menuActiveEvents.indexOf('scrollMenu');
            if (!ui.resolutionService.isMobile()) {
                if (index === -1) {
                    window.addEventListener("scroll", ui.menuService.setMenuScroll, false);
                    window.addEventListener('resize', ui.menuService.setMenuScroll, false);
                    activeEvents.header.push('scrollMenu');
                }
            } else {
                window.removeEventListener("scroll", ui.menuService.setMenuScroll, false);
                window.removeEventListener('resize', ui.menuService.setMenuScroll, false);
                if (index > -1) {
                    menuActiveEvents.splice(index, 1);
                }

                ui.menuService.removePadding();
            }
        }

        return {
            scrollHeader: scrollHeader,
            scrollMenu: scrollMenu
        };
    })();

    ui.eventService = eventService;
}());
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
        submenu.addEventListener('mouseleave', closeSubMenu);
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
            addCloseEventForSubmenu: addCloseEventForSubmenu,
            addCloseEventByClickOnPanel: addCloseEventByClickOnPanel
        };
    })();

    ui.menuService = menuService;
})();

		
(function () {

    'use strict';

    ui.onReady = function (fn) {

        // Sanity check
        if (typeof fn !== 'function') return;

        // If document is already loaded, run method
        if (document.readyState === 'complete') {
            return fn();
        }

        //var onCompleteTimer = setTimeout(function() {
        //    if(document.readyState === 'complete'  ) {
        //        clearTimeout(onCompleteTimer);
        //        return fn();
        //    } else {
        //        onCompleteTimer();
        //    }
        //},100);

        //// Otherwise, wait until document is loaded
        document.addEventListener('DOMContentLoaded', fn, false);
    };
}());
(function () {

    'use strict';

    var MOBILE_WIDTH = 470; //Max mobile width
    var TABLET_WIDTH = 880; //Max tablet width

    var uiResolutionService = {
        getScreenWidth: function () {
            return (window.innerWidth > 0) ? window.innerWidth : screen.width;
        },

        isMobile: function () {
            return this.getScreenWidth() < (MOBILE_WIDTH + 1) ? true : false;
        },

        isTablet: function () {
            return this.getScreenWidth() < (TABLET_WIDTH + 1) ? true : false;
        },

        isFullScreen: function () {
            return this.getScreenWidth() > TABLET_WIDTH ? true : false;
        }
    };

    ui.resolutionService = uiResolutionService;
    ui.MOBILE_WIDTH = MOBILE_WIDTH;
    ui.TABLETWIDTH = TABLET_WIDTH;
})();

		
(function () {

    'use strict';

    var UIHeaderBtn = function UIHeaderBtn(element) {
        this.init(element);
    };

    UIHeaderBtn.prototype.onButtonClick = function (e) {
        var activeButtons = document.documentElement.getElementsByClassName('ui-panel-btn-active');
        for (var i = 0; i < activeButtons.length; i++) {
            activeButtons[i].classList.remove('ui-panel-btn-active');
        }

        this.parentElement.classList.add('ui-panel-btn-active');
    };

    UIHeaderBtn.prototype.init = function (btn) {
        btn.ui = self;

        btn.addEventListener('click', this.onButtonClick);
    };

    ui.register(UIHeaderBtn, 'ui-header-btn', 'headerBtn');
    ui.headerBtn = UIHeaderBtn;

})();
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
(function () {

    'use strict';

    var UIOpenSubMenuBtn = function UIOpenSubMenuBtn(element) {
        this.init(element);
    };

    UIOpenSubMenuBtn.prototype.onButtonClick = function (e) {
        var subMenuName = e.currentTarget.getAttribute('data-sub-menu');
        var submenu = document.querySelector('[data-sub-menu-name="' + subMenuName + '"]');

        if (submenu.classList.contains('ui-submenu-active')) {
            ui.menuService.closeSubMenu();
        } else {
            e.target.offsetParent.classList.remove('ui-sidebar-active');
            e.target.offsetParent.classList.add('ui-sidebar-small');
            ui.menuService.openSubMenu(submenu);
        }

        e.preventDefault();
    };

    UIOpenSubMenuBtn.prototype.init = function (btn) {
        btn.ui = self;

        btn.addEventListener('click', this.onButtonClick);
    };

    ui.register(UIOpenSubMenuBtn, 'ui-open-submenu-btn', 'openSubMenuBtn');
    ui.openSubMenuBtn = UIOpenSubMenuBtn;

})();
(function () {

    'use strict';

    var UIPanelToggleBtn = function UIPanelToggleBtn(element) {
        this.init(element);
    };

    UIPanelToggleBtn.prototype.onButtonClick = function (e) {
        var header = document.getElementsByClassName('ui-header')[0];
        var fieldsets = header.getElementsByClassName('ui-panel-fieldset');
        for (var i = 0; 2 > i; i++) {
            if (fieldsets[i].classList.contains('ui-panel-active')) {
                fieldsets[i].classList.remove('ui-panel-active');
            } else {
                fieldsets[i].classList.add('ui-panel-active');
            }
        }

        if (ui.resolutionService.isTablet()) {
            ui.menuService.addCloseEventByClickOnPanel(e);
        }
    };

    UIPanelToggleBtn.prototype.init = function (btn) {
        btn.ui = self;

        btn.addEventListener('click', this.onButtonClick);
    };

    ui.register(UIPanelToggleBtn, 'ui-panel-toggle-btn', 'uiPanelToggleBtn');
    ui.uiPanelToggleBtn = UIPanelToggleBtn;

})();
(function () {

    'use strict';

    var UISidebarBtn = function UISidebarBtnBtn(element) {
        this.init(element);
    };

    UISidebarBtn.prototype.showSidebar = function(e) {
        var sidebar = e.currentTarget.offsetParent;
        if(!sidebar.classList.contains('ui-sidebar-active')) {
            sidebar.classList.add('ui-sidebar-active');

            sidebar.addEventListener('mouseleave', hideSidebar, false);
        }

        function hideSidebar(e) {
            e.currentTarget.classList.remove('ui-sidebar-active');
            sidebar.removeEventListener('mouseleave', hideSidebar, false);
        }
    };

    UISidebarBtn.prototype.onButtonClick = function (e) {
        if (!ui.resolutionService.isMobile()) {
            UISidebarBtn.prototype.hideSidebar(this);
        }
    };

    UISidebarBtn.prototype.hideSidebar = function (e) {
        var sidebar = e.offsetParent;
        sidebar.classList.remove('ui-sidebar-active');
    };

    UISidebarBtn.prototype.init = function (btn) {
        btn.ui = self;

        btn.addEventListener('click', this.onButtonClick);
        btn.addEventListener('mouseenter', this.showSidebar);
    };

    ui.register(UISidebarBtn, 'ui-sidebar-btn', 'sidebarBtn');
    ui.sidebarBtn = UISidebarBtn;

})();
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
(function () {

    'use strict';

    var UISubMenuBtn = function UISubMenuBtn(element) {
        this.init(element);
    };

    UISubMenuBtn.prototype.onButtonClick = function (e) {
        ui.menuService.closeSubMenu();
    };

    UISubMenuBtn.prototype.init = function (btn) {
        btn.ui = self;

        btn.addEventListener('click', this.onButtonClick);
    };

    ui.register(UISubMenuBtn, 'ui-submenu-btn', 'submenuBtn');
    ui.submenuBtn = UISubMenuBtn;

})();
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
(function () {

    'use strict';

    var UIMobileToggleBtn = function UIMobileToggleBtn(element) {
        this.init(element);
    };

    UIMobileToggleBtn.prototype.onButtonClick = function (e) {
        var header = e.currentTarget.parentElement;
        var isActive = header.classList.contains('active');

        if (!isActive) {
            var panels = header.getElementsByClassName('ui-panel');

            for (var i = 0; i < panels.length; i++) {
                ui.menuService.addCloseEventByClickOnPanel(e);
                panels[i].classList.add('ui-panel-active');
                header.classList.add('active');
                return;
            }
        }
        header.classList.remove('active');
    };

    UIMobileToggleBtn.prototype.init = function (btn) {
        btn.ui = self;

        btn.addEventListener('click', this.onButtonClick);
    };

    ui.register(UIMobileToggleBtn, 'ui-mobile-toggle', 'uiMobileToggleBtn');
    ui.uiMobileToggleBtn = UIMobileToggleBtn;

})();