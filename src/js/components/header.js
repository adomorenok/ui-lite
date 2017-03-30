(function () {

    'use strict';

    var UIHeader = function UIHeader(element) {
        this.init(element);
    };

    UIHeader.prototype.initHeaderButtons = function (header) {
        var headerButtons = header.getElementsByClassName('ui-header-btn');

        for (var b = 0; b < headerButtons.length; b++) {
            headerButtons[b].addEventListener('click', this.onButtonClick);
        }
    };

    UIHeader.prototype.onButtonClick = function (e) {

        //Parse HREF
        var href = this.getAttribute('href');

        if (href) {
            console.log(href);
        }

        e.preventDefault();
    };

    UIHeader.prototype.init = function (header) {
        header.ui = this;

        this.initHeaderButtons(header);
    };

    ui.register(UIHeader, 'ui-header', 'header');
    ui.header = UIHeader;

})();