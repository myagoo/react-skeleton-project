/**
 * Auto-bootstrap components in markup based on `data-react="..."` attribute
 *
 * Example:
 *
 *  ```html
 *   <div data-react="view"></div>
 *   ````
 *
 *   Will autoload `React.components.view` into that node
 */
(function (React) {
    "use strict";

    var S = require("./utils/S");

    // Named components supported in DOM
    // Note: cannot accept `props`
    React.components = {
        navigation: require("./views/navigation.jsx"),
        app: require("./views/app.jsx"),
        footer: require("./views/footer.jsx")
    };

    // Bootstrap `data-react` components
    var elements = Array.prototype.slice.call(S("[data-react]"));
    elements.forEach(function (el) {
        var name = el.getAttribute("data-react"),
            component = React.components[name];

        if (null == component) {
            throw new Error("Unregistered component: " + name);
        }

        React.renderComponent(component(), el);
    });
})(React);
