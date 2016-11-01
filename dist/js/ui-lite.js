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
		var input = e.target
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
