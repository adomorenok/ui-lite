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