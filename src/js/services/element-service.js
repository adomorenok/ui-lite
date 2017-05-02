;(function () {

    'use strict';

    var elementService = {
        create: function(elName, elClass, eAttr, eHTML) {

            var e = document.createElement(elName);
            elClass.forEach(function(_class) {
                e.classList.add(_class);
            });

            for(var a in eAttr) {
                e.setAttribute(a, eAttr[a]);
            }

            if(eHTML) {
                e.innerHTML = eHTML;
            }

            return e;
        }
    };


    ui.elementService = elementService;
}());