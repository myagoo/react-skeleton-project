(function () {
    "use strict";

    var debounce = function (fn, wait, immediate) {
        if (null == immediate) {
            immediate = false;
        }

        var timeout = null;

        return function () {
            var context = this,
                args = arguments;

            clearTimeout(timeout);
            timeout = setTimeout(function () {
                timeout = null;
                if (!immediate) {
                    fn.apply(context, args);
                }
            }, wait);
            if (immediate && !timeout) {
                fn.apply(context, args);
            }
        };
    };

    module.exports = debounce;
})();
