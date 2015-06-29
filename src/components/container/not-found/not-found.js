// Styles
import './_not-found';

// React
import React from 'react';

// Components
import BaseComponent from '../../base-component';

class NotFound extends BaseComponent {
	constructor(props) {
		super(props);
	}
    render() {
        return (
        	<div className="not-found">
        	    Page not found!
            </div>
        );
    }
}


export default NotFound;
