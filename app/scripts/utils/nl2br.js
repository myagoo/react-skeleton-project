(function () {
    "use strict";

    var nl2br = function (text) {
        return text.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, "$1<br>$2");
    };

    module.exports = nl2br;
})();
