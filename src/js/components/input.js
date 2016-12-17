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
