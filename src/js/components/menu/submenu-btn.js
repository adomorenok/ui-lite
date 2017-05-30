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

    ui.register(UISubMenuBtn, 'ui-submenu-btn', 'submenu-btn');
    ui.submenuBtn = UISubMenuBtn;

})();