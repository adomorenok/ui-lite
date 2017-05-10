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
            var uiHomeBtn = ui.elementService.create('a',['ui-header-btn'], {'href' : '#'});
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
        var self = this;
        header.ui = self;

        ui.onReady(function() {
            self.initHeaderStructure(header);
            self.initPanelToggleButton(header);
            self.initButtons(header);
            self.initDefaultActivePanel(header);
            self.initScrollEvent();

            window.addEventListener('resize', self.initScrollEvent);
        });
    };

    ui.register(UIHeader, 'ui-header', 'header');
    ui.header = UIHeader;

})();