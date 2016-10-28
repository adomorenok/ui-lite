(function () {

	function checkValue(input) {
		var parent = input.parentElement;

		if (input.value) { 
			parent.classList.add('ul-has-value');
		} else {
			parent.classList.remove('ul-has-value');
		}
	}

	function onfocus(e) {
		var parent = e.target.parentElement;
		parent.classList.add('ul-on-focus');
	}

	function onblur(e) {
		var input = e.target
			parent = input.parentElement;
		parent.classList.remove('ul-on-focus');

		checkValue(input);
	}

	function getLabel(input) {
		var label = input.previousElementSibling;

		if (label && label.classList && label.classList.contains('ul-label')) {
			return label;
		}

		label = input.nextElementSibling;

		if (label && label.classList && label.classList.contains('ul-label')) {
			return label;
		}

		return null;
	}

	function init(input) {
		checkValue(input);

		input.onfocus = onfocus;
		input.onblur = onblur;

		var label = getLabel(input);

		if (label) {
			label.onclick = function () {
				input.focus();
			};
		}
	}

	ul.input = {
		init: init
	};

})();
