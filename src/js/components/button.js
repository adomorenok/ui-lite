(function() {
  	'use strict';

	function addRipleEffect(btn) {
		var span = document.createElement('span');
		span.classList.add('ul-btn-ripple-container');

		var spanRipple = document.createElement('span');
		spanRipple.classList.add('ul-ripple');
		span.appendChild(spanRipple);
		btn.appendChild(span);
	}

	function findRipple(clidNodes) {
		for (var j = 0; j < clidNodes.length; j++) {
			if (clidNodes[j].classList && clidNodes[j].classList.contains('ul-btn-ripple-container')) {
				return clidNodes[j].childNodes[0];
			}
		}
	}

	function mouseDown(e) {
		var btn = e.currentTarget,
			ripple = findRipple(btn.childNodes);
		
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

		ripple.classList.add('ul-visible');
		ripple.style.transform = 'translate(-50%, -50%) ' + offset + scale;
		
		setTimeout(function() {	
			ripple.classList.add('ui-animate');
		});
		setTimeout(function() {
			ripple.style.transform = 'translate(-50%, -50%) ' + offset;
		}, 100);
	}

	function mouseUp(e) {
		var btn = e.currentTarget,
			ripple = findRipple(btn.childNodes);
		
		if (ripple) {
			ripple.classList.remove('ul-visible');
		}
	}

	function init(btn) {
		addRipleEffect(btn);
		btn.onmousedown = mouseDown;
		btn.onmouseleave = btn.onmouseup = mouseUp;
	}

	ul.button = {
		init: init
	}

})();