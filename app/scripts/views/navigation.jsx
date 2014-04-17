/**
 * @jsx React.DOM
 */
(function (React) {
    "use strict";

    var Navbar = React.createClass({
        render: function () {
            return (
                /* jshint ignore:start */
                <nav className="navbar navbar-inverse navbar-static-top" role="navigation">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"/>
                                <span className="icon-bar"/>
                                <span className="icon-bar"/>
                            </button>
                            <a className="navbar-brand" href="/">Example project</a>
                        </div>

                        <div className="collapse navbar-collapse">
                            <ul className="nav navbar-nav">
                                <li>
                                    <a href="#">Home</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                /* jshint ignore:end */
            );
        }
    });

    module.exports = Navbar;
})(React);
