(function () {

    'use strict';

    ui.onReady = function (fn) {

        // Sanity check
        if (typeof fn !== 'function') return;

        // If document is already loaded, run method
        if (document.readyState === 'complete') {
            return fn();
        }

        //var onCompleteTimer = setTimeout(function() {
        //    if(document.readyState === 'complete'  ) {
        //        clearTimeout(onCompleteTimer);
        //        return fn();
        //    } else {
        //        onCompleteTimer();
        //    }
        //},100);

        //// Otherwise, wait until document is loaded
        document.addEventListener('DOMContentLoaded', fn, false);
    };
}());