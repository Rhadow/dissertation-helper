// Styles
import './_author-name-sorter';

// React
import React from 'react';

// Components
import BaseComponent from '../base-component';

class AuthorNameSorter extends BaseComponent {
	constructor(props) {
		super(props);
		this._bind(
			'_onSubmitHandler',
			'_onClearHandler'
		);
	}
	_onClearHandler(e) {
		e.preventDefault();
		React.findDOMNode(this.refs.authorInput).value = '';
	}
	_onSubmitHandler(e) {
		e.preventDefault();
		let inputContent = React.findDOMNode(this.refs.authorInput).value,
		    listOfReference = inputContent.split('\n');
		this.props.onSortHandler(listOfReference);
	}
	render() {
		const {
			inputHintText,
			outputHintText,
			sortedResult
		} = this.props;

		return (
			<div className="author-name-sorter container">
			    <div className="row">
			        <div className="col-md-6">
			            <h4>
			                {inputHintText}
			                <a
					            className="btn btn-default btn-sm"
					            onClick={this._onClearHandler}>
						        <span className="glyphicon glyphicon-remove"></span>
						    </a>
			                <a
					            className="btn btn-default btn-sm"
					            onClick={this._onSubmitHandler}>
						        <span className="glyphicon glyphicon-transfer"></span>
						    </a>
			            </h4>
					    <textarea
						    className="form-control arthor-name-input-text-area"
						    ref="authorInput" />
			        </div>
			        <div className="col-md-6">
			            <h4>{outputHintText}</h4>
				        <textarea
				            className="form-control output-text-area"
				            disabled
				            value={sortedResult} />
			        </div>
			    </div>
			</div>
		);
	}
}

AuthorNameSorter.propTypes = {
	inputHintText : React.PropTypes.string,
	outputHintText: React.PropTypes.string,
	sortedResult  : React.PropTypes.string,
	onSortHandler : React.PropTypes.func
};
AuthorNameSorter.defaultProps = {
	inputHintText : 'Input',
	outputHintText: 'Output',
	sortedResult  : '',
	onSortHandler : () => {}
};

export default AuthorNameSorter;
