;(function(){
	
	'use strict';

	var container,
		sidebar,
		submenu;

	var UISidebar = function UISidebar(element) {
		this.init(element);
	};

	UISidebar.prototype.mouseover = function(e) {
		container.classList.add('ui-container-has-open-sidebar');
	};

	UISidebar.prototype.mouseout = function(e) {
		container.classList.remove('ui-container-has-open-sidebar');
	};

	UISidebar.prototype.resize = function(e) {

		if(!resolutionService.isMobile()) {
			if(!container.classList.contains('ui-container-has-sidebar')) {
				container.classList.add('ui-container-has-sidebar');
			}

		} else {
			if(container.classList.contains('ui-container-has-sidebar')) {
				container.classList.remove('ui-container-has-sidebar');
			}
		}
	};

	UISidebar.prototype.initSidebarButtons = function(sidebar) {

		var sidebarButtons = sidebar.getElementsByClassName('ui-sidebar-btn');

		for(var b = 0; b < sidebarButtons.length; b++) {
			sidebarButtons[b].addEventListener('click', this.onbuttonclick);
		}
	};

	UISidebar.prototype.onbuttonclick = function(e) {

		//Parse HREF
		var href = this.getAttribute('href');

		if(href) {
			console.log(href);

			if(href === 'submenu') {
				UISidebar.prototype.showSubMenu();
			} else {
				UISidebar.prototype.hideSubMenu();
			}
		}

		if(!resolutionService.isMobile()) {
			UISidebar.prototype.hideSidebar(this, (href === 'submenu' ? true : false));
		}

		e.preventDefault();
	};

	UISidebar.prototype.showSubMenu = function() {
		submenu.classList.add('ui-submenu-active');

		menuService.addCloseEventByClick('submenu');
	};

	UISidebar.prototype.hideSubMenu = function() {

		if(submenu.classList.contains('ui-submenu-active')) {
			submenu.classList.remove('ui-submenu-active');
		}
	}

	UISidebar.prototype.hideSidebar = function(_this, submenu) {

		sidebar.classList.add('ui-sidebar-hidden');
		if(submenu) {
			container.classList.add('ui-container-has-open-submenu');
		}

		setTimeout(function() {
			sidebar.classList.remove('ui-sidebar-hidden');
		},500);
	};

	UISidebar.prototype.init = function(_sidebar) {
		_sidebar.ui = this;

		//Sidebar for not a mobile resol
		container = document.getElementsByClassName('ui-container')[0];
		submenu = document.getElementsByClassName('ui-submenu')[0];
		sidebar = _sidebar;
		if(!resolutionService.isMobile()) {
			container.classList.add('ui-container-has-sidebar');
		}

		this.initSidebarButtons(_sidebar);

		_sidebar.addEventListener('mouseover', this.mouseover);
		_sidebar.addEventListener('mouseout', this.mouseout);

		window.addEventListener('resize', this.resize);
	};

	ui.register(UISidebar, 'ui-sidebar', 'sidebar');
    ui.sidebar = UISidebar;
})();