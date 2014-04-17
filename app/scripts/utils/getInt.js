(function () {
    "use strict";

    var getFloat = require("./getFloat");

    var getInt = function (input, abs) {
        return parseInt(getFloat(input, abs), 10);
    };

    module.exports = getInt;
})();
