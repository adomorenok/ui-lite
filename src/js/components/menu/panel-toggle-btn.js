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