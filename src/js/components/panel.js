;(function(){
	
	'use strict';

	var panel;

	var UIPanel = function UIPanel(element) {
		this.init(element);
	};

	UIPanel.prototype.initPanelButtons = function(panel) {
		var panelButtons = panel.getElementsByClassName('ui-panel-btn');

		for(var b = 0; b < panelButtons.length; b++) {
			panelButtons[b].addEventListener('click', this.onButtonClick);
		}
	};

	UIPanel.prototype.initPanelToggleButton = function(panel) {
		var panelToggleButton = document.documentElement.getElementsByClassName('ui-panel-toggle-btn')[0];

		if(panelToggleButton) {
			panelToggleButton.addEventListener('click', function(e) {	

				var fieldsets = panel.getElementsByClassName('ui-panel-fieldset');
				for(var i = 0; 2 > i; i++) {
					fieldsets[i].classList.contains('ui-panel-active') ? fieldsets[i].classList.remove('ui-panel-active') : fieldsets[i].classList.add('ui-panel-active');
				}

				if(resolutionService.isMobile()) {
					menuService.addCloseEventByClickOnPanel(e);
				}

				e.preventDefault();
			});
		}
	};

	UIPanel.prototype.initDefaultActivePanel = function(panel) {
		var activePanel = panel.getElementsByClassName('ui-panel-active');

		if(!activePanel[0]) {
			var firstPanelBlock = panel.getElementsByClassName('ui-panel-fieldset')[0];
			firstPanelBlock ? firstPanelBlock.classList.add('ui-panel-active') : null;
		}
	};

	UIPanel.prototype.onButtonClick = function(e) {

		e.preventDefault();

		//Find all activ buttons
		var activeButton = panel.getElementsByClassName('ui-panel-btn-active')[0];
		if(activeButton) {
			activeButton.classList.remove('ui-panel-btn-active');
		}

		//Parse HREF
		var href = this.getAttribute('href');
		

		if(href) {
			console.log(href);
		}

		this.parentElement.classList.add('ui-panel-btn-active');
	};

	UIPanel.prototype.init = function(_panel) {
		_panel.ui = this;
		panel = _panel;

		this.initDefaultActivePanel(panel);
		this.initPanelToggleButton(panel);
		this.initPanelButtons(panel);
	};


	ui.register(UIPanel, 'ui-panel', 'panel');
    ui.panel = UIPanel;
})();