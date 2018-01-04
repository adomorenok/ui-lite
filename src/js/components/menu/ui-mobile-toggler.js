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

            ui.menuService.addCloseEventByClickOnPanel(e);
            panels[0].classList.add('ui-panel-active');
            header.classList.add('active');
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