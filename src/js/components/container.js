(function () {

    'use strict';

    var UIContainer = function UIContainer(element) {
        this.init(element);
    };


    UIContainer.prototype.init = function (container) {
        container.ui = this;
    };

    ui.register(UIContainer, 'ui-container', 'container');
    ui.container = UIContainer;

})();
