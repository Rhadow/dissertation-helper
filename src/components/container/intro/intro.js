// Styles
import './_intro';

// React
import React from 'react';

// Components
import BaseComponent from '../../base-component';

class Intro extends BaseComponent {
	constructor(props) {
		super(props);
	}
    render() {
        return (
        	<div className="intro">
        	    Hello, this is dissertation helper
            </div>
        );
    }
}


export default Intro;
