(function () {
    "use strict";

    var preventDefault = function (e) {
        if (null != e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    };

    module.exports = preventDefault;
})();
