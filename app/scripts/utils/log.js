(function () {
    "use strict";

    var log = function () {
        log.history = log.history || [];
        log.history.push(arguments);
        console.log(Array.prototype.slice.call(arguments));
    };

    module.exports = log;
})();
