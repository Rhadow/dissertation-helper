// Styles
import './_main';

// Library
import React from 'react';
import {RouteHandler} from 'react-router';
import classNames from 'classnames';

// Components
import BaseComponent from '../../base-component';

class Main extends BaseComponent {
	constructor(props) {
		super(props);
        this._bind(
            '_getCurrentService'
        );
	}
    _getCurrentService() {
        return this.context.router.getCurrentPathname();
    }
    render() {
        let currentService = this._getCurrentService(),
            homeClassNames = classNames({
                'active': currentService === '/'
            }),
            sorterClassNames = classNames({
                'active': currentService === '/name-sorter'
            });
        return (
            <div className="main container">
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button
                                type="button"
                                className="navbar-toggle collapsed"
                                data-toggle="collapse"
                                data-target="#dissertation-helper-nav"
                                aria-expanded="false">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse" id="dissertation-helper-nav">
                            <ul className="nav navbar-nav">
                                <li className={homeClassNames}><a href="#/">簡介</a></li>
                                <li className={sorterClassNames}><a href="#/name-sorter">文獻排列小幫手</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="row">
                    <div className="col-md-12">
                        <RouteHandler />
                    </div>
                </div>
            </div>
        );
    }
}

Main.contextTypes = {
    router: React.PropTypes.func.isRequired
};

export default Main;
