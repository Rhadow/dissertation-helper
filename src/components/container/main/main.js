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
                    <div className="col-md-2">Menu</div>
                    <div className="col-md-10">
                        <RouteHandler />
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
