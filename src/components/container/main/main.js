// Styles
import './_main';

// Library
import React from 'react';
import {RouteHandler} from 'react-router';

// Components
import BaseComponent from '../../base-component';

class Main extends BaseComponent {
	constructor(props) {
		super(props);
	}
    render() {
        return (
            <div className="main container">
                <div className="row">
                    <div className="col-md-12">
                        <ul>
                            <li>
                                <a href="#/name-sorter">Name Sorter</a>
                            </li>
                            <li>
                                <a href="#/">Home</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <RouteHandler />
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
