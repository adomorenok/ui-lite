(function () {

    'use strict';

    var UIHeaderBtn = function UIHeaderBtn(element) {
        this.init(element);
    };

    UIHeaderBtn.prototype.onButtonClick = function (e) {
        var activeButtons = document.documentElement.getElementsByClassName('ui-panel-btn-active');
        for (var i = 0; i < activeButtons.length; i++) {
            activeButtons[i].classList.remove('ui-panel-btn-active');
        }

        this.parentElement.classList.add('ui-panel-btn-active');
    };

    UIHeaderBtn.prototype.init = function (btn) {
        btn.ui = self;

        btn.addEventListener('click', this.onButtonClick);
    };

    ui.register(UIHeaderBtn, 'ui-header-btn', 'headerBtn');
    ui.headerBtn = UIHeaderBtn;

})();