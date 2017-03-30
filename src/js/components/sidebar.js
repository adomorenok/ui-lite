(function () {

    'use strict';

    var container,
        sidebar;

    var UISidebar = function UISidebar(element) {
        this.init(element);
    };

    UISidebar.prototype.mouseover = function (e) {
        if (sidebar.classList.contains('ui-sidebar-left')) {
            container.classList.add('ui-container-has-left-open-sidebar');
        } else {
            container.classList.add('ui-container-has-right-open-sidebar');
        }
    };

    UISidebar.prototype.mouseout = function (e) {
        if (sidebar.classList.contains('ui-sidebar-left')) {
            container.classList.remove('ui-container-has-left-open-sidebar');
        } else {
            container.classList.remove('ui-container-has-right-open-sidebar');
        }
    };

    UISidebar.prototype.initContainerDependencies = function (e) {
        if (!resolutionService.isMobile()) {
            if (!container.classList.contains('ui-container-has-left-sidebar') && sidebar.classList.contains('ui-sidebar-left')) {
                container.classList.add('ui-container-has-left-sidebar');
            } else if (!container.classList.contains('ui-container-has-right-sidebar') && sidebar.classList.contains('ui-sidebar-right')) {
                container.classList.add('ui-container-has-right-sidebar');
            }
        } else {
            if (container.classList.contains('ui-container-has-left-sidebar') && sidebar.classList.contains('ui-sidebar-left')) {
                container.classList.remove('ui-container-has-left-sidebar');
            } else if (container.classList.contains('ui-container-has-right-sidebar') && sidebar.classList.contains('ui-sidebar-right')) {
                container.classList.remove('ui-container-has-right-sidebar');
            }
        }
    };

    UISidebar.prototype.initSidebarButtons = function (sidebar) {
        var sidebarButtons = sidebar.getElementsByClassName('ui-sidebar-btn');

        for (var b = 0; b < sidebarButtons.length; b++) {
            sidebarButtons[b].addEventListener('click', this.onButtonClick);
        }
    };

    UISidebar.prototype.onButtonClick = function (e) {

        //Parse HREF
        var href = this.getAttribute('href');

        if (href) {
            console.log(href);
        }

        if (!resolutionService.isMobile()) {
            UISidebar.prototype.hideSidebar(this);
        }

        e.preventDefault();
    };

    UISidebar.prototype.hideSidebar = function () {

        sidebar.classList.add('ui-sidebar-hidden');

        setTimeout(function () {
            sidebar.classList.remove('ui-sidebar-hidden');
        }, 150);
    };

    UISidebar.prototype.init = function (_sidebar) {
        _sidebar.ui = this;

        //Sidebar for not a mobile resol
        container = document.getElementsByClassName('ui-container')[0];
        sidebar = _sidebar;

        this.initContainerDependencies();
        this.initSidebarButtons(_sidebar);

        _sidebar.addEventListener('mouseover', this.mouseover);
        _sidebar.addEventListener('mouseout', this.mouseout);

        window.addEventListener('resize', this.initContainerDependencies);
    };

    ui.register(UISidebar, 'ui-sidebar', 'sidebar');
    ui.sidebar = UISidebar;

})();