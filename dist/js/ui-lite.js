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

    UIHeader.prototype.initHeaderButtons = function (header) {
        var headerButtons = header.getElementsByClassName('ui-header-btn');

        for (var b = 0; b < headerButtons.length; b++) {
            headerButtons[b].addEventListener('click', this.onButtonClick);
        }
    };

    UIHeader.prototype.onButtonClick = function (e) {

        //Parse HREF
        var href = this.getAttribute('href');

        if (href) {
            console.log(href);
        }

        e.preventDefault();
    };

    UIHeader.prototype.init = function (header) {
        header.ui = this;

        this.initHeaderButtons(header);
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

    var panel;

    var UIPanel = function UIPanel(element) {
        this.init(element);
    };

    UIPanel.prototype.initPanelButtons = function (panel) {
        var panelButtons = panel.getElementsByClassName('ui-panel-btn');

        for (var b = 0; b < panelButtons.length; b++) {
            panelButtons[b].addEventListener('click', this.onButtonClick);
        }
    };

    UIPanel.prototype.initPanelToggleButton = function (panel) {
        var panelToggleButton = document.documentElement.getElementsByClassName('ui-panel-toggle-btn')[0];

        if (panelToggleButton) {
            panelToggleButton.addEventListener('click', function (e) {
                var fieldsets = panel.getElementsByClassName('ui-panel-fieldset');
                for (var i = 0; 2 > i; i++) {
                    if (fieldsets[i].classList.contains('ui-panel-active')) {
                        fieldsets[i].classList.remove('ui-panel-active');
                    } else {
                        fieldsets[i].classList.add('ui-panel-active');
                    }
                }

                if (resolutionService.isMobile()) {
                    menuService.addCloseEventByClickOnPanel(e);
                }

                e.preventDefault();
            });
        }
    };

    UIPanel.prototype.initDefaultActivePanel = function (panel) {
        var activePanel = panel.getElementsByClassName('ui-panel-active');

        if (!activePanel[0]) {
            var firstPanelBlock = panel.getElementsByClassName('ui-panel-fieldset')[0];
            if (firstPanelBlock) {
                firstPanelBlock.classList.add('ui-panel-active');
            }
        }
    };

    UIPanel.prototype.onButtonClick = function (e) {

        e.preventDefault();

        //Find all activ buttons
        var activeButton = panel.getElementsByClassName('ui-panel-btn-active')[0];
        if (activeButton) {
            activeButton.classList.remove('ui-panel-btn-active');
        }

        //Parse HREF
        var href = this.getAttribute('href');


        if (href) {
            console.log(href);
        }

        this.parentElement.classList.add('ui-panel-btn-active');
    };

    UIPanel.prototype.init = function (_panel) {
        _panel.ui = this;
        panel = _panel;

        this.initDefaultActivePanel(panel);
        this.initPanelToggleButton(panel);
        this.initPanelButtons(panel);
    };


    ui.register(UIPanel, 'ui-panel', 'panel');
    ui.panel = UIPanel;
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

    var container,
        sidebar;

    var UISidebar = function UISidebar(element) {
        this.init(element);
    };

    UISidebar.prototype.mouseover = function (e) {
        if (sidebar.classList.contains('ui-sidebar-left')) {
            container.classList.add('ui-container-has-left-open-sidebar');
        } else {
            container.classList.add('ui-container-has-right-open-sidebar');
        }
    };

    UISidebar.prototype.mouseout = function (e) {
        if (sidebar.classList.contains('ui-sidebar-left')) {
            container.classList.remove('ui-container-has-left-open-sidebar');
        } else {
            container.classList.remove('ui-container-has-right-open-sidebar');
        }
    };

    UISidebar.prototype.initContainerDependencies = function (e) {
        if (!resolutionService.isMobile()) {
            if (!container.classList.contains('ui-container-has-left-sidebar') && sidebar.classList.contains('ui-sidebar-left')) {
                container.classList.add('ui-container-has-left-sidebar');
            } else if (!container.classList.contains('ui-container-has-right-sidebar') && sidebar.classList.contains('ui-sidebar-right')) {
                container.classList.add('ui-container-has-right-sidebar');
            }
        } else {
            if (container.classList.contains('ui-container-has-left-sidebar') && sidebar.classList.contains('ui-sidebar-left')) {
                container.classList.remove('ui-container-has-left-sidebar');
            } else if (container.classList.contains('ui-container-has-right-sidebar') && sidebar.classList.contains('ui-sidebar-right')) {
                container.classList.remove('ui-container-has-right-sidebar');
            }
        }
    };

    UISidebar.prototype.initSidebarButtons = function (sidebar) {
        var sidebarButtons = sidebar.getElementsByClassName('ui-sidebar-btn');

        for (var b = 0; b < sidebarButtons.length; b++) {
            sidebarButtons[b].addEventListener('click', this.onButtonClick);
        }
    };

    UISidebar.prototype.onButtonClick = function (e) {

        //Parse HREF
        var href = this.getAttribute('href');

        if (href) {
            console.log(href);
        }

        if (!resolutionService.isMobile()) {
            UISidebar.prototype.hideSidebar(this);
        }

        e.preventDefault();
    };

    UISidebar.prototype.hideSidebar = function () {

        sidebar.classList.add('ui-sidebar-hidden');

        setTimeout(function () {
            sidebar.classList.remove('ui-sidebar-hidden');
        }, 150);
    };

    UISidebar.prototype.init = function (_sidebar) {
        _sidebar.ui = this;

        //Sidebar for not a mobile resol
        container = document.getElementsByClassName('ui-container')[0];
        sidebar = _sidebar;

        this.initContainerDependencies();
        this.initSidebarButtons(_sidebar);

        _sidebar.addEventListener('mouseover', this.mouseover);
        _sidebar.addEventListener('mouseout', this.mouseout);

        window.addEventListener('resize', this.initContainerDependencies);
    };

    ui.register(UISidebar, 'ui-sidebar', 'sidebar');
    ui.sidebar = UISidebar;

})();
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
(function () {

    'use strict';

    var submenu = document.getElementsByClassName('ui-submenu')[0];
    var container = document.getElementsByClassName('ui-container')[0];
    var sidebar = document.getElementsByClassName('ui-sidebar')[0];
    var panel = document.getElementsByClassName('ui-panel')[0];

    function openSubMenu() {
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
        panel.classList.remove('ui-panel-active');
        document.documentElement.removeEventListener('click', closePanel, true);
    }

    function addCloseEventByClickOnSubmenu() {
        document.documentElement.addEventListener('click', closeSubMenu, true);
    }

    function addCloseEventByClickOnPanel() {
        panel.classList.add('ui-panel-active');
        document.documentElement.addEventListener('click', closePanel, true);
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

		
(function () {

    'use strict';

    var MOBILEWIDTH = 670; //Max mobile width
    var TABLETWIDTH = 880; //Max mobile width

    var resolutionService = {

        getScreenWidth: function () {
            return (window.innerWidth > 0) ? window.innerWidth : screen.width;
        },

        isMobile: function () {
            return this.getScreenWidth() < (MOBILEWIDTH + 1) ? true : false;
        },

        isTablet: function () {
            return this.getScreenWidth() < (TABLETWIDTH + 1) ? true : false;
        }
    };

    window.resolutionService = resolutionService;
    window.MOBILEWIDTH = MOBILEWIDTH;
    window.TABLETWIDTH = TABLETWIDTH;
})();

		