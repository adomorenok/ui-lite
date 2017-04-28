(function () {

    'use strict';

    var UIHeader = function UIHeader(element) {
        this.init(element);
    };

    UIHeader.prototype.initButtons = function (header) {
        var headerButtons = header.getElementsByClassName('ui-header-btn');
        var panelButtons = header.getElementsByClassName('ui-panel-btn');

        addButtonEvents(headerButtons);
        addButtonEvents(panelButtons);

        function addButtonEvents(buttons) {
            for (var b = 0; b < buttons.length; b++) {
                buttons[b].addEventListener('click', UIHeader.prototype.onButtonClick);
            }
        }
    };

    UIHeader.prototype.initPanelToggleButton = function (header) {
        var panelToggleButton = document.documentElement.getElementsByClassName('ui-panel-toggle-btn')[0];

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

                if (resolutionService.isTablet()) {
                    menuService.addCloseEventByClickOnPanel(e);
                }

                e.preventDefault();
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

        this.initButtons(header);
        this.initPanelToggleButton(header);
        this.initDefaultActivePanel(header);
    };

    ui.register(UIHeader, 'ui-header', 'header');
    ui.header = UIHeader;

})();