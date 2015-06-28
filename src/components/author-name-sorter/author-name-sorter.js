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
			'_onSubmitHandler'
		);
	}
	_onSubmitHandler() {
		let inputContent = React.findDOMNode(this.refs.authorInput).value,
		    listOfReference = inputContent.split('\n');
		this.props.onSortHandler(listOfReference);
	}
	render() {
		const {
			sortedResult
		} = this.props;

		return (
			<div className="author-name-sorter">
			    <h1>Author Name Sorter</h1>
			    <textarea ref="authorInput"/>
			    <input
			        type="button"
			        value="submit"
			        onClick={this._onSubmitHandler} />
			    <pre>{sortedResult}</pre>
			</div>
		);
	}
}

AuthorNameSorter.propTypes = {
	sortedResult: React.PropTypes.string,
	onSortHandler: React.PropTypes.func
};
AuthorNameSorter.defaultProps = {
	sortedResult: '',
	onSortHandler: () => {}
};

export default AuthorNameSorter;
