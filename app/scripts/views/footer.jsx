/**
 * @jsx React.DOM
 */
(function (React) {
    "use strict";

    var Footer = React.createClass({
        render: function () {
            return (
                /* jshint ignore:start */
                <footer className="sticky">
                    <div className="container">
                        <p>Footer</p>
                    </div>
                </footer>
                /* jshint ignore:end */
            );
        }
    });

    module.exports = Footer;
})(React);
