;(function(){
	
	'use strict';

	var UIHeader = function UIHeader(element) {
		this.init(element);
	};

	UIHeader.prototype.initHeaderButtons = function(header) {

		var headerButtons = header.getElementsByClassName('ui-header-btn');

		for(var b = 0; b < headerButtons.length; b++) {
			headerButtons[b].addEventListener('click', this.onbuttonclick);
		}
	};

	UIHeader.prototype.onbuttonclick = function(e) {

		//Parse HREF
		var href = this.getAttribute('href');

		if(href) {
			console.log(href);

			if(href === 'submenu') {
				UIHeader.prototype.showSubMenu();
			}
		}

		e.preventDefault();
	};

	UIHeader.prototype.showSubMenu = function() {

		var sidebar = document.getElementsByClassName('ui-sidebar')[0];
		var submenu = document.getElementsByClassName('ui-submenu')[0];
		sidebar.classList.add('ui-sidebar-hidden');
		submenu.classList.add('ui-submenu-active');

		menuService.addCloseEventByClick('submenu');
	};

	UIHeader.prototype.init = function(header) {
		header.ui = this;

		this.initHeaderButtons(header);
	};

	ui.register(UIHeader, 'ui-header', 'header');
    ui.header = UIHeader;
})();