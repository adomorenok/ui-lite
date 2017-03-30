(function () {

    'use strict';

    var UIFooter = function UIFooter(element) {
        this.init(element);
    };

    UIFooter.prototype.init = function (footer) {
        footer.ui = this;
    };

    ui.register(UIFooter, 'ui-footer', 'footer');
    ui.footer = UIFooter;

})();