(function () {

    'use strict';

    var UISidebar = function UISidebar(element) {
        this.init(element);
    };

    UISidebar.prototype.initSidebarStructure = function(sidebar) {
        var sidebarContainers = sidebar.getElementsByTagName('div');
        var sidebarButtons = sidebar.getElementsByTagName('a');
        var sidebarIcons = sidebar.getElementsByTagName('i');
        var sidebarLabels = sidebar.getElementsByTagName('span');

        for(var c = 0; c < sidebarContainers.length; c++) {
            sidebarContainers[c].classList.add('ui-sidebar-element-container');
        }
        for(var b = 0; b < sidebarButtons.length; b++) {
            sidebarButtons[b].classList.add('ui-sidebar-btn');
        }
        for(var i = 0; i < sidebarIcons.length; i++) {
            sidebarIcons[i].classList.add('ui-icon');
        }
        for(var l = 0; l < sidebarLabels.length; l++) {
            sidebarLabels[l].classList.add('ui-sidebar-element-label');
        }
    };

    UISidebar.prototype.initSidebarButtons = function (sidebar) {
        var sidebarButtons = sidebar.getElementsByClassName('ui-sidebar-btn');

        for (var b = 0; b < sidebarButtons.length; b++) {
            sidebarButtons[b].addEventListener('click', this.onButtonClick);
            sidebarButtons[b].addEventListener("mouseover", this.showSidebar);
        }
    };

    UISidebar.prototype.initScrollEvent = function() {
        ui.eventService.scrollMenu();
    };

    UISidebar.prototype.onButtonClick = function (e) {

        //Parse HREF
        var href = this.getAttribute('href');

        if (!ui.resolutionService.isMobile()) {
            UISidebar.prototype.hideSidebar(this);
        }
    };

    UISidebar.prototype.showSidebar = function(e) {
        var sidebar = e.target.offsetParent;
        if(!sidebar.classList.contains('ui-sidebar-active'))
            sidebar.classList.add('ui-sidebar-active');

        sidebar.addEventListener('mouseleave', hideSidebar, false);

        function hideSidebar(e) {
            e.target.classList.remove('ui-sidebar-active');
            sidebar.removeEventListener('mouseleave', hideSidebar, false);
        }
    };

    UISidebar.prototype.hideSidebar = function (e) {
        var sidebar = e.offsetParent;
        sidebar.classList.remove('ui-sidebar-active');
    };

    UISidebar.prototype.init = function (sidebar) {
        var self = this;
        sidebar.ui = self;

        ui.onReady(function() {
            self.initSidebarStructure(sidebar);
            self.initSidebarButtons(sidebar);
            self.initScrollEvent();
            ui.menuService.setMenuScroll(sidebar);
            window.addEventListener('resize', self.initScrollEvent);
        });
    };

    ui.register(UISidebar, 'ui-sidebar', 'sidebar');
    ui.sidebar = UISidebar;

})();