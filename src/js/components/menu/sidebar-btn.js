(function () {

    'use strict';

    var UISidebarBtn = function UISidebarBtnBtn(element) {
        this.init(element);
    };

    UISidebarBtn.prototype.showSidebar = function(e) {
        var sidebar = e.target.offsetParent;
        if(!sidebar.classList.contains('ui-sidebar-active')) {
            sidebar.classList.add('ui-sidebar-active');
        }

        sidebar.addEventListener('mouseleave', hideSidebar, false);

        function hideSidebar(e) {
            e.target.classList.remove('ui-sidebar-active');
            sidebar.removeEventListener('mouseleave', hideSidebar, false);
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
        btn.addEventListener("mouseover", this.showSidebar);
    };

    ui.register(UISidebarBtn, 'ui-sidebar-btn', 'sidebar-btn');
    ui.submenuBtn = UISidebarBtn;

})();