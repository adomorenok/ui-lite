(function () {

    'use strict';

    var UIRadio = function UIRadio(element) {
        this.init(element);
    };


    UIRadio.prototype.init = function (radio) {
        radio.ui = this;
    };

    ui.register(UIRadio, 'ui-radio', 'radio');
    ui.radio = UIRadio;

})();
