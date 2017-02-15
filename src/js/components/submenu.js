;(function(){
	
	'use strict';

	var container,
		submenu,
		sidebar;

	var UISubMenu = function UISubMenu(element) {
		this.init(element);
	};

	UISubMenu.prototype.initSubmenuButtons = function(submenu) {
		var submenuButtons = submenu.getElementsByClassName('ui-submenu-btn');

		for(var b = 0; b < submenuButtons.length; b++) {
			submenuButtons[b].addEventListener('click', this.onbuttonclick);
		}
	};

	UISubMenu.prototype.onbuttonclick = function(e) {

		//Parse HREF
		var href = this.getAttribute('href');

		if(href) {
			console.log(href);
		}

		UISubMenu.prototype.hideSubmenu(this);

		e.preventDefault();
	};

	UISubMenu.prototype.mouseover = function(e) {
		container.classList.add('ui-container-has-open-submenu');
	};

	UISubMenu.prototype.mouseout = function(e) {
		container.classList.remove('ui-container-has-open-submenu');
		submenu.classList.remove('ui-submenu-active');
		sidebar.classList.remove('ui-sidebar-hidden');
	};

	UISubMenu.prototype.resize = function(e) {

		if(!resolutionService.isMobile()) {
			if(!container.classList.contains('ui-container-has-submenu')) {
				container.classList.add('ui-container-has-submenu');
			}

		} else {
			if(container.classList.contains('ui-container-has-submenu')) {
				container.classList.remove('ui-container-has-submenu');
			}
		}
	};

	UISubMenu.prototype.hideSubmenu = function(_this) {	

		sidebar.classList.remove('ui-sidebar-hidden');
		submenu.classList.remove('ui-submenu-active');
		submenu.classList.add('ui-submenu-hidden');

		setTimeout(function() {
			submenu.classList.remove('ui-submenu-hidden');
		},500);
	};

	UISubMenu.prototype.init = function(_submenu) {

		_submenu.ui = this;
		submenu = _submenu
		container = document.getElementsByClassName('ui-container')[0];
		sidebar = document.getElementsByClassName('ui-sidebar')[0];

		this.initSubmenuButtons(submenu);

		_submenu.addEventListener('mouseover', this.mouseover);
		_submenu.addEventListener('mouseout', this.mouseout);	

		window.addEventListener('resize', this.resize);
	};

	ui.register(UISubMenu, 'ui-submenu', 'submenu');
    ui.submenu = UISubMenu;
})();