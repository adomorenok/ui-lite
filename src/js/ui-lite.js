(function() {
	window.ul = {};

	ul._components = {
		'button': 'ul-bnt',
		'input': 'ul-input'
	};

	ul._initComponents = function(component, className) {
		var elements = document.getElementsByClassName(className);

		for(var i = 0; i < elements.length; i++) {
			ul[component].init(elements[i]);
		}
	};

	ul.init = function() {
		for(var i in ul._components) {
			ul._initComponents(i, ul._components[i]);
		}
	};

})();
