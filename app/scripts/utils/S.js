(function () {
    "use strict";

    var S = function (selector, context) {
        return (null == context ? document : context).querySelectorAll(selector);
    };

    module.exports = S;
})();
