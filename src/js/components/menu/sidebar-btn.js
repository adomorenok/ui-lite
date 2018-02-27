(function () {

    'use strict';

    var UISidebarBtn = function UISidebarBtnBtn(element) {
        this.init(element);
    };

    UISidebarBtn.prototype.showSidebar = function(e) {
        ui.menuService.closeSubMenuExcludingPinnedMode();
        var sidebar = e.currentTarget.offsetParent;
        if(!sidebar.classList.contains('ui-sidebar-active') && !existActivePinnedModeSubmenu()) {
            sidebar.classList.add('ui-sidebar-active');

            sidebar.addEventListener('mouseleave', hideSidebar, false);
        }

        function hideSidebar(e) {
            e.currentTarget.classList.remove('ui-sidebar-active');
            sidebar.removeEventListener('mouseleave', hideSidebar, false);
        }

        function existActivePinnedModeSubmenu() {
            var exist = false;
            var submenuList = document.documentElement.getElementsByClassName('ui-submenu');
            for (var i = 0; i < submenuList.length; i++) {
                if (submenuList[i].classList.contains('ui-submenu-active') &&
                    submenuList[i].classList.contains('ui-submenu__pinned-mode')) {
                   exist = true;
                   break;
                }
            }
            return exist;
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