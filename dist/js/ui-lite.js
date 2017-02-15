(function() {

	var ui = {};

	ui.componentService = {
		components: [],

		register: function(componentName, className) {
			this.components.push({
				name: componentName,
				className: className
			});
		},

		initAllComponents: function() {
			for (var i = 0; i < this.components.length; i++) {
				this.initComponents(this.components[i]);
			}
		},

		initComponents: function(component) {
			var elements = document.getElementsByClassName(component.className);

			for(var i = 0; i < elements.length; i++) {
				new ui[component.name](elements[i]);
			}
		}
	};

	ui.register = function(component, className, componentName) {
		ui[componentName] = component;
		ui.componentService.register(componentName, className);
	};

	ui.init = function() {
		ui.componentService.initAllComponents();
	};

	window.ui = ui;
})();

(function() {
  	'use strict';

  	var UiButton = function UiButton(element) {
  		this.init(element);
  	};

	UiButton.prototype.addRipleEffect = function (btn) {
		var span = document.createElement('span');
		span.classList.add('ui-btn-ripple-container');

		var spanRipple = document.createElement('span');
		spanRipple.classList.add('ui-ripple');
		span.appendChild(spanRipple);
		btn.appendChild(span);
	};

	UiButton.prototype.findRipple = function (clidNodes) {
		for (var j = 0; j < clidNodes.length; j++) {
			if (clidNodes[j].classList && clidNodes[j].classList.contains('ui-btn-ripple-container')) {
				return clidNodes[j].childNodes[0];
			}
		}
	};

	UiButton.prototype.mouseDown = function (e) {
		var btn = e.currentTarget,
			ripple = btn.ui.findRipple(btn.childNodes);
		
		if (!ripple) {
			return;
		}

		var width = btn.offsetWidth,
			height = btn.offsetHeight;
		
		ripple.classList.remove('ui-animate');

		var rippleSize = Math.sqrt(width * width + height * height) * 2 + 2;

		ripple.style.width = rippleSize + 'px';
		ripple.style.height = rippleSize + 'px';

		var scale = 'scale(0.0001, 0.0001) ';
		var offset = 'translate(' + e.offsetX + 'px, ' + e.offsetY + 'px) ';

		ripple.classList.add('ui-visible');
		ripple.style.transform = 'translate(-50%, -50%) ' + offset + scale;
		
		setTimeout(function() {	
			ripple.classList.add('ui-animate');
		});
		setTimeout(function() {
			ripple.style.transform = 'translate(-50%, -50%) ' + offset;
		}, 100);
	};

	UiButton.prototype.mouseUp = function (e) {
		var btn = e.currentTarget,
			ripple = btn.ui.findRipple(btn.childNodes);
		
		if (ripple) {
			ripple.classList.remove('ui-visible');
		}
	};

	UiButton.prototype.init = function (btn) {
		btn.ui = this;

		this.addRipleEffect(btn);

		btn.addEventListener('mousedown', this.mouseDown);
		btn.addEventListener('mouseup', this.mouseUp);
		btn.addEventListener('mouseout', this.mouseUp);
		
	};

	ui.register(UiButton, 'ui-btn', 'button');
	ui.button = UiButton;

})();
;(function(){
	
	'use strict';

	var UIContainer = function UIContainer(element) {
		this.init(element);
	};


	UIContainer.prototype.init = function(container) {
		container.ui = this;
	};

	ui.register(UIContainer, 'ui-container', 'container');
    ui.container = UIContainer;
})();

;(function(){
	
	'use strict';

	var UIFooter = function UIFooter(element) {
		this.init(element);
	};

	UIFooter.prototype.init = function(footer) {
		footer.ui = this;
	};

	ui.register(UIFooter, 'ui-footer', 'footer');
    ui.footer = UIFooter;
})();
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
	};

	UIHeader.prototype.init = function(header) {
		header.ui = this;

		this.initHeaderButtons(header);
	};

	ui.register(UIHeader, 'ui-header', 'header');
    ui.header = UIHeader;
})();
(function () {
  'use strict';
  
  	var UiInput = function UiInput(element) {
  		this.init(element);
  	};

	UiInput.prototype.checkValue = function (input) {
		var parent = input.parentElement;

		if (input.value) { 
			parent.classList.add('ui-has-value');
		} else {
			parent.classList.remove('ui-has-value');
		}
	};

	UiInput.prototype.onfocus = function (e) {
		var parent = e.target.parentElement;
		parent.classList.add('ui-on-focus');
	};

	UiInput.prototype.onblur = function (e) {
		var input = e.target,
			parent = input.parentElement;
		parent.classList.remove('ui-on-focus');

		this.ui.checkValue(input);
	};

	UiInput.prototype.getLabel = function (input) {
		var label = input.previousElementSibling;

		if (label && label.classList && label.classList.contains('ui-label')) {
			return label;
		}

		label = input.nextElementSibling;

		if (label && label.classList && label.classList.contains('ui-label')) {
			return label;
		}

		return null;
	};

	UiInput.prototype.init = function (input) {
		input.ui = this;
		
		this.checkValue(input);

		input.addEventListener('focus', this.onfocus);
		input.addEventListener('blur', this.onblur);

		var label = this.getLabel(input);

		if (label) {
			label.addEventListener('click', function () {
				input.focus();
				input.value = input.value;
			});
		}
	};

	ui.register(UiInput, 'ui-input', 'input');
	ui.input = UiInput;

})();

(function () {
    'use strict';

    var UiSelect = function UiSelect(element, list, label) {
        this.init(element, list, label);
    };

    UiSelect.prototype.checkValue = function (input) {
        var parent = input.parentElement;

        if (input.value) {
            parent.classList.add('ui-has-value');
        } else {
            parent.classList.remove('ui-has-value');
        }
    };

    UiSelect.prototype.upgrade = function (select) {
        var parent = select.parentElement;

        parent.classList.add('ui-upgraded');
    };

    UiSelect.prototype.addInput = function (select) {
        var parent = select.parentElement;

        var input = document.createElement('input');
        input.classList.add('ui-select-input');
        parent.appendChild(input);

        return input;
    };

    UiSelect.prototype.updateOptions = function (select, list, label) {
        if (!list) {
            return;
        }
        for (var i = select.childNodes.length - 1; i >= 0 ; i--) {
            select.removeChild(select.childNodes[i]);
        }

        for (var i = 0; i < list.length; i++) {
            var option = document.createElement('option');
            option.value = i;
            option.uiValue = list[i];
            option.innerHTML = list[i][label];
            select.appendChild(option);
        }

    };

    UiSelect.prototype.generateList = function (select, input) {
        var parent = select.parentElement;

        var selectIcon = document.createElement('span');
        selectIcon.classList.add('ui-select-icon');
        selectIcon.addEventListener('click', function (e) {
            input.focus();
            input.value = input.value;
        });
        parent.appendChild(selectIcon);

        var list = document.createElement('div');
        list.classList.add('ui-select-options');

        var childNodes = select.options;
        for (var i = 0; i < childNodes.length; i++) {
            list.appendChild(this.createOption(childNodes[i], input, select));
        }

        parent.appendChild(list);
        input.selectList = list;
    };

    UiSelect.prototype.createOption = function (node, input, select) {
        var option = document.createElement('div');
        option.setAttribute('value', node.value);
        option.classList.add('ui-select-option');
        option.textContent = node.textContent;
        option.tabIndex = '0';
        option.addEventListener('click', function (e) {
            input.value = node.label;
            select.value = node.value;
            select.uiValue = node.uiValue;
            input.ui.checkValue(input);
            input.ui.closeSelect(input);
        });
        option.addEventListener('keydown', function (e) {
            var keyCode = e.which || e.keyCode;
            if(keyCode == 13) {
                input.value = node.label;
                select.value = node.value;
                select.uiValue = node.uiValue;
                input.ui.checkValue(input);
            } else if (keyCode == 40) {
                e.target.nextElementSibling.focus();
            } else if (keyCode == 38) {
                e.target.previousElementSibling.focus();
            } else if (keyCode == 27) {
                // close select
                input.ui.closeSelect(input);
            }
        });
        option.addEventListener('blur', function (e) {
            setTimeout(function() {
                if (!document.activeElement.classList || !document.activeElement.classList.contains('ui-select-option')) {
                    input.ui.closeSelect(input);
                }
            }, 0);
        });

        return option;
    };

    UiSelect.prototype.onfocus = function (e) {
        var input = e.target,
            parent = input.parentElement;

        parent.classList.add('ui-on-focus');
        input.selectList.classList.add('opening');
        setTimeout(function() {
            input.selectList.classList.add('is-opened');
            input.selectList.childNodes[0].focus();
        }, 0);

    };

    UiSelect.prototype.onblur = function (e) {
        var select = e.target,
            parent = select.parentElement;
        parent.classList.remove('ui-on-focus');

        this.ui.checkValue(select);
    };

    UiSelect.prototype.closeSelect = function (input) {
        var parent = input.parentElement;
        parent.classList.remove('ui-on-focus');
        input.selectList.classList.remove('is-opened');

        input.ui.checkValue(input);
    };

    UiSelect.prototype.getLabel = function (input) {
        var label = input.previousElementSibling;

        if (label && label.classList && label.classList.contains('ui-label')) {
            return label;
        }

        label = input.nextElementSibling;

        if (label && label.classList && label.classList.contains('ui-label')) {
            return label;
        }

        return null;
    };

    UiSelect.prototype.getValue = function () {
        console.log(this);
    };

    UiSelect.prototype.init = function (select, list, label) {
        this.updateOptions(select, list, label);
        this.upgrade(select);
        var input = this.addInput(select);
        this.checkValue(input);
        this.generateList(select, input);

        input.addEventListener('focus', this.onfocus);
        input.addEventListener('blur', this.onblur);

        var label = this.getLabel(select);

        if (label) {
            label.addEventListener('click', function (e) {
                input.focus();
                input.value = input.value;
            });
        }

        select.ui = input.ui = this;
        select.ui.getValue = function () {
            console.log(select.uiValue);
        };
    };

    ui.register(UiSelect, 'ui-select', 'select');
    ui.select = UiSelect;

})();

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
(function() {

	'use strict';

	var menuService = {};

})();

		
(function() {

	'use strict';

	var MOBILEWIDTH = 480; //Max mobile width

	var resolutionService = {

		getScreenWidth : function() {
			return (window.innerWidth > 0) ? window.innerWidth : screen.width;
		},

		isMobile : function() {
			return this.getScreenWidth() < (MOBILEWIDTH + 1) ? true : false;
		}
	};

	window.resolutionService = resolutionService;
})();

		