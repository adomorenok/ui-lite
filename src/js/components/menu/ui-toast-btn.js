(function () {

    'use strict';

    var UIToastBtn = function UIToastBtn(element) {
        this.init(element);
    };

    UIToastBtn.prototype.onButtonClick = function (e) {
        ui.menuService.closeSubMenu();
    };

    UIToastBtn.prototype.init = function (btn) {
        btn.ui = self;

        btn.addEventListener('click', this.onButtonClick);
    };

    ui.register(UIToastBtn, 'ui-toast-btn', 'toastBtn');
    ui.toastBtn = UIToastBtn;

})();