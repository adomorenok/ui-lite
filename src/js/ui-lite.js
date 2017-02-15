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
