(function () {
    "use strict";

    var getFloat = function (input, abs) {
        if (null == abs) {
            abs = false;
        }

        var val = (input + "").replace(/\s+/, "").replace(",", ".");
        val = parseFloat(val);
        if (abs) {
            val = Math.abs(val);
        }
        if (isNaN(val)) {
            val = 0;
        }

        return val;
    };

    module.exports = getFloat;
})();
