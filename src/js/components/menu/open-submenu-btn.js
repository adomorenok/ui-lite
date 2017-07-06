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