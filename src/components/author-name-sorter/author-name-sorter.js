// Styles
import './_author-name-sorter';

// React
import React from 'react';
import ZeroClipboard from 'zeroclipboard';

// Components
import BaseComponent from '../base-component';

class AuthorNameSorter extends BaseComponent {
	constructor(props) {
		super(props);
		this._bind(
			'_onClearHandler',
			'_onSubmitHandler'
		);
	}
	componentDidMount() {
		const {
			copyToClipboardText,
			copyCompleteText
		} = this.props;
		$('[data-toggle="tooltip"]').tooltip();
		ZeroClipboard.config({
            swfPath: '../../components/author-name-sorter/ZeroClipboard.swf'
        });
        let clipboardClient = new ZeroClipboard(React.findDOMNode(this.refs.copyToClipboardBtn));
        clipboardClient.on('ready', () => {
            $(React.findDOMNode(this.refs.copyToClipboardBtn))
                .data('placement', 'top')
                .attr('title', copyToClipboardText)
                .tooltip();
            clipboardClient.on('copy', (event) => {
                event.clipboardData.setData(
                	'text/plain',
                	React.findDOMNode(this.refs.authorOutput).value.replace(/\n\n/g, '\n')
                );
            });
            clipboardClient.on('aftercopy', () => {
                $(React.findDOMNode(this.refs.copyToClipboardBtn))
                    .attr('title', copyCompleteText)
                    .tooltip('fixTitle')
                    .tooltip('show')
                    .attr('title', copyToClipboardText)
                    .tooltip('fixTitle');
            });
        });
	}
	_onSubmitHandler(e) {
		e.preventDefault();
		let inputContent = React.findDOMNode(this.refs.authorInput).value,
		    listOfReference = inputContent.split('\n');
		this.props.onSortHandler(listOfReference);
	}
	_onClearHandler(e) {
		e.preventDefault();
		React.findDOMNode(this.refs.authorInput).value = '';
	}
	_renderOutputTextArea() {
		const {
			showLoading,
			loadingText,
			sortedResult
		} = this.props;
		let resultHTML = (
			<textarea
	            className="form-control output-text-area"
	            ref="authorOutput"
	            disabled
	            value={sortedResult} />
		);

		if(showLoading) {
			resultHTML = (
				<textarea
		            className="form-control output-text-area"
		            value={loadingText}
		            disabled />
			);
		}

		return resultHTML;
	}
	render() {
		const {
			inputHintText,
			outputHintText,
			onCopyToClipboardHandler,
			clearText,
			sortText
		} = this.props;

		let outputTextAreaHTML = this._renderOutputTextArea();

		return (
			<div className="author-name-sorter container">
			    <div className="row">
			        <div className="col-md-6">
			            <h4>
			                {inputHintText}
			                <a
					            className="btn btn-default btn-sm"
					            data-toggle="tooltip"
					            data-placement="top"
					            title={clearText}
					            onClick={this._onClearHandler}>
						        <span className="glyphicon glyphicon-remove"></span>
						    </a>
			                <a
					            className="btn btn-default btn-sm"
					            data-toggle="tooltip"
					            data-placement="top"
					            title={sortText}
					            onClick={this._onSubmitHandler}>
						        <span className="glyphicon glyphicon-transfer"></span>
						    </a>
			            </h4>
					    <textarea
						    className="form-control arthor-name-input-text-area"
						    ref="authorInput" />
			        </div>
			        <div className="col-md-6">
			            <h4>
			                {outputHintText}
			                <a
					            className="btn btn-default btn-sm"
					            ref="copyToClipboardBtn"
					            onClick={onCopyToClipboardHandler}>
						        <span className="glyphicon glyphicon-list-alt"></span>
						    </a>
			            </h4>
				        {outputTextAreaHTML}
			        </div>
			    </div>
			</div>
		);
	}
}

AuthorNameSorter.propTypes = {
	inputHintText           : React.PropTypes.string,
	outputHintText          : React.PropTypes.string,
	copyToClipboardText     : React.PropTypes.string,
	copyCompleteText        : React.PropTypes.string,
	loadingText             : React.PropTypes.string,
	clearText               : React.PropTypes.string,
	sortText                : React.PropTypes.string,
	sortedResult            : React.PropTypes.string,
	onSortHandler           : React.PropTypes.func,
	onCopyToClipboardHandler: React.PropTypes.func,
	showLoading             : React.PropTypes.bool
};
AuthorNameSorter.defaultProps = {
	inputHintText           : 'Input',
	outputHintText          : 'Output',
	copyToClipboardText     : 'Copy to clipboard',
	copyCompleteText        : 'Copied!',
	loadingText             : 'Loading...',
	clearText               : 'Clear',
	sortText                : 'Start Sorting!',
	sortedResult            : '',
	onSortHandler           : () => {},
	onCopyToClipboardHandler: () => {},
	showLoading             : false
};

export default AuthorNameSorter;
