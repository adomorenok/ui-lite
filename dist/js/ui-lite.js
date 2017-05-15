(function () {

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

    var UIHeader = function UIHeader(element) {
        this.init(element);
    };

    UIHeader.prototype.initButtons = function (header) {
        var headerButtons = header.getElementsByClassName('ui-header-btn');
        var panelButtons = header.getElementsByClassName('ui-panel-btn');

        addClickOnButton(headerButtons);
        addClickOnButton(panelButtons);

        function addClickOnButton(buttons) {
            for (var b = 0; b < buttons.length; b++) {
                buttons[b].addEventListener('click', UIHeader.prototype.onButtonClick);
            }
        }
    };

    UIHeader.prototype.initPanelToggleButton = function (header) {
        var panelToggleButtons = document.documentElement.getElementsByClassName('ui-panel-toggle-btn');
        var panelToggleButton = panelToggleButtons[1] || panelToggleButtons[0];

        if (panelToggleButton) {
            panelToggleButton.addEventListener('click', function (e) {
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
            });
        }
    };

    UIHeader.prototype.initDefaultActivePanel = function (header) {
        var activePanel = header.getElementsByClassName('ui-panel-active');

        if (!activePanel[0]) {
            var firstPanelBlock = header.getElementsByClassName('ui-panel-fieldset')[0];
            if (firstPanelBlock) {
                firstPanelBlock.classList.add('ui-panel-active');
            }
        }
    };

    UIHeader.prototype.initHeaderStructure = function(header) {
        /* General Header */
        var headerGeneral = ui.elementService.create('div',['ui-header-general']);

        /* Panel Toggle */
        function createPanelToggle() {
            var uiPanelToggle = ui.elementService.create('div',['ui-header-element-container']);
            var uiPanelToggleBtn = ui.elementService.create('div',['ui-panel-toggle-btn']);
            var uiMenuIcon = ui.elementService.create('i',['ui-icon', 'fa', 'fa-bars']);
            uiPanelToggleBtn.appendChild(uiMenuIcon);
            uiPanelToggle.appendChild(uiPanelToggleBtn);

            return uiPanelToggle;
        }

        /* Logo Container */
        function createLogoContainer() {
            var uiHome = ui.elementService.create('div',['ui-header-element-container' ,'ui-header-logo-conteiner']);
            var uiHomeBtn = ui.elementService.create('a',['ui-header-btn'], {'href' : '/'});
            var uiHomeLogo = ui.elementService.create('i',['ui-icon', 'ui-logo']);
            uiHomeBtn.appendChild(uiHomeLogo);
            uiHome.appendChild(uiHomeBtn);

            return uiHome;
        }

        /* Right icon */
        var uiRight = ui.elementService.create('div',['ui-header-element-container' ,'ui-right-icon']);
        var uiRightBtn = ui.elementService.create('div',['ui-open-submenu-btn', 'w-ui-icon']);
        var uiRightLogo = ui.elementService.create('i',['ui-icon', 'ui-icon-setting']);
        uiRightBtn.appendChild(uiRightLogo);
        uiRight.appendChild(uiRightBtn);

        headerGeneral.appendChild(createPanelToggle());
        headerGeneral.appendChild(createLogoContainer());
        headerGeneral.appendChild(uiRight);


        /* UI Panel */
        var panel = header.getElementsByClassName('ui-panel');
        var panelFieldSets = header.getElementsByClassName('ui-panel-fieldset');

        var fieldSetContainer;
        var panelButton;
        for (var p = 0; p < 2; p++) {

            fieldSetContainer = panelFieldSets[p].getElementsByTagName('div');
            panelButton = panelFieldSets[p].getElementsByTagName('a');

            for(var f = 0; f < fieldSetContainer.length; f++) {
                fieldSetContainer[f].classList.add('ui-panel-element-container');
            }

            for(var b = 0; b < panelButton.length; b++) {
                panelButton[b].classList.add('ui-panel-btn');
            }

            if(p === 0) {
                var panelToggleContainer = ui.elementService.create('div', ['ui-panel-toggle-mobile']);
                panelToggleContainer.appendChild(createPanelToggle());
                panelToggleContainer.appendChild(createLogoContainer());
                panelFieldSets[0].insertBefore(panelToggleContainer, fieldSetContainer[0]);
            }
        }

        /* Mobile Toggle Button */
        var uiMobileToggle = createPanelToggle();
        uiMobileToggle.classList.add('ui-mobile-toggle');
        uiMobileToggle.addEventListener('click', function(e) {
            var isActive = header.classList.contains('active');
            var panel = header.getElementsByClassName('ui-panel')[0];

            if(!isActive) {
                ui.menuService.addCloseEventByClickOnPanel(e);
                panel.classList.add('ui-panel-active');
                header.classList.add('active');
                return;
            }
            header.classList.remove('active');
        }, true);
        headerGeneral.appendChild(uiMobileToggle);

        /* Assembly */
        header.appendChild(headerGeneral);
        header.appendChild(uiMobileToggle);

    };

    UIHeader.prototype.initScrollEvent = function (e) {
        ui.eventService.scrollHeader();
    };

    UIHeader.prototype.setHeaderScroll = function() {
        var mobileToggleBtn = document.documentElement.getElementsByClassName('ui-mobile-toggle')[0];
        var panel = document.documentElement.getElementsByClassName('ui-panel')[0];
        if (document.body.scrollTop > 44 || document.documentElement.scrollTop > 44) {
            mobileToggleBtn.style.display = 'block';
        } else {
            mobileToggleBtn.style.display = 'none';
        }
    };

    UIHeader.prototype.onButtonClick = function (e) {

        //e.preventDefault();

        //Find all activ buttons
        var activeButton = document.documentElement.getElementsByClassName('ui-panel-btn-active')[0];
        if (activeButton) {
            activeButton.classList.remove('ui-panel-btn-active');
        }

        //Parse HREF
        var href = this.getAttribute('href');

        this.parentElement.classList.add('ui-panel-btn-active');
    };

    UIHeader.prototype.init = function (header) {
        header.ui = this;

        this.initHeaderStructure(header);
        this.initPanelToggleButton(header);
        this.initButtons(header);
        this.initDefaultActivePanel(header);
        this.initScrollEvent();

        window.addEventListener('resize', this.initScrollEvent);
    };

    ui.register(UIHeader, 'ui-header', 'header');
    ui.header = UIHeader;

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

    var UISidebar = function UISidebar(element) {
        this.init(element);
    };

    UISidebar.prototype.initSidebarStructure = function(sidebar) {
        var sidebarContainers = sidebar.getElementsByTagName('div');
        var sidebarButtons = sidebar.getElementsByTagName('a');
        var sidebarIcons = sidebar.getElementsByTagName('i');
        var sidebarLabels = sidebar.getElementsByTagName('span');

        for(var c = 0; c < sidebarContainers.length; c++) {
            sidebarContainers[c].classList.add('ui-sidebar-element-container');
        }
        for(var b = 0; b < sidebarButtons.length; b++) {
            sidebarButtons[b].classList.add('ui-sidebar-btn');
        }
        for(var i = 0; i < sidebarIcons.length; i++) {
            sidebarIcons[i].classList.add('ui-icon');
        }
        for(var l = 0; l < sidebarLabels.length; l++) {
            sidebarLabels[l].classList.add('ui-sidebar-element-label');
        }
    };

    UISidebar.prototype.initSidebarButtons = function (sidebar) {
        var sidebarButtons = sidebar.getElementsByClassName('ui-sidebar-btn');

        for (var b = 0; b < sidebarButtons.length; b++) {
            sidebarButtons[b].addEventListener('click', this.onButtonClick);
            sidebarButtons[b].addEventListener("mouseover", this.showSidebar);
        }
    };

    UISidebar.prototype.initScrollEvent = function() {
        ui.eventService.scrollMenu();
    };

    UISidebar.prototype.onButtonClick = function (e) {

        //Parse HREF
        var href = this.getAttribute('href');

        if (!ui.resolutionService.isMobile()) {
            UISidebar.prototype.hideSidebar(this);
        }
    };

    UISidebar.prototype.showSidebar = function(e) {
        var sidebar = e.target.offsetParent;
        if(!sidebar.classList.contains('ui-sidebar-active'))
            sidebar.classList.add('ui-sidebar-active');

        sidebar.addEventListener('mouseleave', hideSidebar, false);

        function hideSidebar(e) {
            e.target.classList.remove('ui-sidebar-active');
            sidebar.removeEventListener('mouseleave', hideSidebar, false);
        }
    };

    UISidebar.prototype.hideSidebar = function (e) {
        var sidebar = e.offsetParent;
        sidebar.classList.remove('ui-sidebar-active');
    };

    UISidebar.prototype.init = function (sidebar) {
        sidebar.ui = this;
        
        this.initSidebarStructure(sidebar);
        this.initSidebarButtons(sidebar);
        this.initScrollEvent();
        ui.menuService.setMenuScroll(sidebar);
        window.addEventListener('resize', this.initScrollEvent);
    };

    ui.register(UISidebar, 'ui-sidebar', 'sidebar');
    ui.sidebar = UISidebar;

})();
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
;(function () {

    'use strict';

    var elementService = {
        create: function(elName, elClass, eAttr, eHTML) {

            var e = document.createElement(elName);
            elClass.forEach(function(_class) {
                e.classList.add(_class);
            });

            for(var a in eAttr) {
                e.setAttribute(a, eAttr[a]);
            }

            if(eHTML) {
                e.innerHTML = eHTML;
            }

            return e;
        }
    };


    ui.elementService = elementService;
}());
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
            var index = menuActiveEvents.indexOf('scrollMenu');
            if(!ui.resolutionService.isMobile()) {
                if(index === -1) {
                    window.addEventListener("scroll", ui.menuService.setMenuScroll, false);
                    window.addEventListener('resize', ui.menuService.setMenuScroll, false);
                    activeEvents.header.push('scrollMenu');
                }
            } else {
                window.removeEventListener("scroll", ui.menuService.setMenuScroll, false);
                window.removeEventListener('resize', ui.menuService.setMenuScroll, false);
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
        var sidebar = document.documentElement.getElementsByClassName('ui-sidebar')[0];
        var submenu = document.documentElement.getElementsByClassName('ui-submenu')[0];

        if(sidebar) addPadding(sidebar, scroll);
        if(submenu) addPadding(submenu, scroll);
    }

    function addPadding(e, scroll) {
        if(scroll < 64) {
            e.style.paddingTop = (64 - scroll) + 'px';
        } else {
            e.style.paddingTop = 0;
        }
    }

    var menuService = (function () {
        return {
            closeSubMenu: closeSubMenu,
            openSubMenu: openSubMenu,
            setMenuScroll: setMenuScroll,
            addCloseEventByClickOnSubmenu: addCloseEventByClickOnSubmenu,
            addCloseEventByClickOnPanel: addCloseEventByClickOnPanel
        };
    })();

    ui.menuService = menuService;
})();

		
;(function() {

    'use strict';

    ui.onReady = function ( fn ) {

        // Sanity check
        if ( typeof fn !== 'function' ) return;

        // If document is already loaded, run method
        if ( document.readyState === 'complete'  ) {
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
        document.addEventListener( 'DOMContentLoaded', fn, false );
    };
}());
(function () {

    'use strict';

	var MOBILEWIDTH = 470; //Max mobile width
	var TABLETWIDTH = 880; //Max mobile width

    var uiResolutionService = {

        getScreenWidth: function () {
            return (window.innerWidth > 0) ? window.innerWidth : screen.width;
        },

        isMobile: function () {
            return this.getScreenWidth() < (MOBILEWIDTH + 1) ? true : false;
        },

        isTablet: function () {
            return this.getScreenWidth() < (TABLETWIDTH + 1) ? true : false;
        },

        isFullScreen: function () {
            return this.getScreenWidth() > TABLETWIDTH ? true : false;
        }
    };

    ui.resolutionService = uiResolutionService;
    ui.MOBILEWIDTH = MOBILEWIDTH;
    ui.TABLETWIDTH = TABLETWIDTH;
})();

		