// Styles
import './_author-name-sorter';

// React
import React from 'react';
import ZeroClipboard from 'zeroclipboard';

// Components
import BaseComponent from '../../base-component';
import AuthorNameSorter from '../../author-name-sorter/author-name-sorter';

// Actions
import AuthorNameSorterActions from '../../../actions/author-name-sorter-actions';

// Stores
import AuthorNameSorterStore from '../../../stores/author-name-sorter-store';

class AuthorNameSorterContainer extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = {
            nameSorterTitle: '文獻排列小幫手',
            inputExampleTitle: '輸入範例：',
			authorNameSorterResult: '',
            description: '本功能將依照作者姓名筆畫進行文獻排列，輸入需注意以下三點：',
            noticeOne: '每篇文獻必須以作者名開始，作者名結束後以空白與剩餘內容斷開',
            noticeTwo: '多作者可以頓號分隔，會以排在第一的作者名做為排列標準',
            noticeThree: '每篇文獻必須用 enter 鍵斷行',
            exampleInput: `陸雅青、周怡君、林純如 等譯(2008)。《藝術治療:心理專業實務手冊》。台 北:學富。ISBN:9789868357891。MalchiodiC.A.(2008). Handbook of art therapy. New York : The Guilford Press
台灣藝術治療學會 (2015)。http://www.arttherapy.org.tw/arttherapy/post/post/ data/arttherapy/tw/what_is_art_therapy/。(2015/5/10)。
丁凡 譯(2011)。《以畫為鏡-存在藝術治療》。台北:張老師。ISBN:9789576937743 。 Moon B. L. (2009). Existential Art Therapy:The Canvas Mirror., Springfield Charles C Thomas.
吳明富、黃傳永 (2013)。《藝樹園丁:失落與悲傷藝術治療》。台北市:張老師。 ISBN:9789576938276`,
            inputHintText: '輸入',
            outputHintText: '輸出'
		};
		this._bind(
			'_onAuthorNameSorterStoreChange',
            '_onCopyToClipboardHandler'
		);
	}
	componentDidMount() {
		AuthorNameSorterStore.addChangeListener(this._onAuthorNameSorterStoreChange);
        ZeroClipboard.config({
            swfPath: '../../components/author-name-sorter/ZeroClipboard.swf'
        });
        let clipboardClient = new ZeroClipboard(document.getElementById('copyToClipboardBtn'));
        clipboardClient.on('ready', () => {
            clipboardClient.on('copy', (event) => {
                event.clipboardData.setData('text/plain', event.target.value);
            });
            clipboardClient.on('aftercopy', (event) => {
                console.log(`Copied text to clipboard: ${event.data['text/plain']}`);
            });
        });
	}
	componentWillUnmount() {
        AuthorNameSorterStore.removeChangeListener(this._onAuthorNameSorterStoreChange);
    }
    _onAuthorNameSorterStoreChange() {
    	this.setState({
    		authorNameSorterResult: AuthorNameSorterStore.getSortedList()
    	});
    }
    _onCopyToClipboardHandler(e) {
        e.preventDefault();
    }
    render() {
    	const {
            nameSorterTitle,
            inputExampleTitle,
    		authorNameSorterResult,
            description,
            noticeOne,
            noticeTwo,
            noticeThree,
            exampleInput,
            inputHintText,
            outputHintText
    	} = this.state;

        return (
        	<div className="dissertion-helper">
                <h1>{nameSorterTitle}</h1>
                <p>
                    {description}
                </p>
                <ul>
                    <li>{noticeOne}</li>
                    <li>{noticeTwo}</li>
                    <li>{noticeThree}</li>
                </ul>
                <h4>{inputExampleTitle}</h4>
                <pre>
                    {exampleInput}
                </pre>
                <AuthorNameSorter
                    inputHintText={inputHintText}
                    outputHintText={outputHintText}
                    onSortHandler={AuthorNameSorterActions.sortListByAuthorStroke}
                    sortedResult={authorNameSorterResult}
                    onCopyToClipboardHandler={this._onCopyToClipboardHandler}/>
            </div>
        );
    }
}


export default AuthorNameSorterContainer;
