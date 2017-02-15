(function() {

	'use strict';

	var submenu =  document.getElementsByClassName('ui-submenu')[0];
	var container = document.getElementsByClassName('ui-container')[0];
	var sidebar = document.getElementsByClassName('ui-sidebar')[0];

	function closeSubMenu(e, type) {

		sidebar.classList.remove('ui-sidebar-hidden');
		submenu.classList.remove('ui-submenu-active');
		submenu.classList.add('ui-submenu-hidden');

		setTimeout(function() {
			submenu.classList.remove('ui-submenu-hidden');
		},500);

		document.documentElement.removeEventListener('click', closeSubMenu, true);
	}

	var menuService = {

		addCloseEventByClick: function(type) {
			document.documentElement.addEventListener('click', closeSubMenu, true);
		}
	};
		
	window.menuService = menuService;
})();

		