// Styles
import './_author-name-sorter';

// React
import React from 'react';

// Components
import BaseComponent from '../../base-component';
import AuthorNameSorter from '../../author-name-sorter/author-name-sorter';

// Actions
import AuthorNameSorterActions from '../../../actions/author-name-sorter-actions';

// Stores
import AuthorNameSorterStore from '../../../stores/author-name-sorter-store';

let actionMap = {
    sortListByAuthorStroke: AuthorNameSorterActions.sortListByAuthorStroke,
    setLoadingStatusTo: AuthorNameSorterActions.setLoadingStatusTo
};

class AuthorNameSorterContainer extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = {
            nameSorterTitle: '文獻排列小幫手',
            inputExampleTitle: '輸入範例：',
			authorNameSorterResult: '',
            loadingText: '處理中...',
            description: '本功能將依照作者姓名筆畫進行文獻排列，會自動將中英文作者分類，輸入需注意以下三點：',
            noticeOne: '每篇文獻必須以作者名開始，作者名結束後以空白與剩餘內容斷開',
            noticeTwo: '多作者可以頓號分隔，會以排在第一的作者名做為排列標準',
            noticeThree: '每篇文獻必須用至少一個 enter 鍵斷行',
            exampleInput: `陸雅青、周怡君、林純如 等譯(2008)。《藝術治療:心理專業實務手冊》。台 北:學富。ISBN:9789868357891。MalchiodiC.A.(2008). Handbook of art therapy. New York : The Guilford Press

台灣藝術治療學會 (2015)。http://www.arttherapy.org.tw/arttherapy/post/post/ data/arttherapy/tw/what_is_art_therapy/。(2015/5/10)。

Shannon, C. & Smith, I. E. (2003). Breast cancer in adolescents and young women. European Journal of cancer, 39(18), 2632-2642. doi:10.1016/S0959- 8049(03)00669-5

丁凡 譯(2011)。《以畫為鏡-存在藝術治療》。台北:張老師。ISBN:9789576937743 。 Moon B. L. (2009). Existential Art Therapy:The Canvas Mirror., Springfield Charles C Thomas.

Ferrell, B. R., Grant, M., Funk, B., Otis-Green, S., & Garcia, N. (1998). Quality of life in breast cancer: Part II: Psychological and spiritual well-being. Cancer Nursing, 21(1), 1-9.

吳明富、黃傳永 (2013)。《藝樹園丁:失落與悲傷藝術治療》。台北市:張老師。 ISBN:9789576938276`,
            inputHintText: '輸入',
            outputHintText: '輸出',
            copyToClipboardText: '複製到剪貼簿',
            copyCompleteText: '已複製!',
            showLoading: AuthorNameSorterStore.getLoadingStatus(),
            clearText: '清空',
            sortText: '開始排列!'
		};
		this._bind(
            '_onSortHandler',
            '_onCopyToClipboardHandler',
            '_onAuthorNameSorterStoreChange'
		);
	}
	componentDidMount() {
		AuthorNameSorterStore.addChangeListener(this._onAuthorNameSorterStoreChange);
	}
	componentWillUnmount() {
        AuthorNameSorterStore.removeChangeListener(this._onAuthorNameSorterStoreChange);
    }
    _onSortHandler(listOfReference) {
        actionMap.setLoadingStatusTo(true);
        actionMap.sortListByAuthorStroke(listOfReference);
    }
    _onCopyToClipboardHandler(e) {
        e.preventDefault();
    }
    _onAuthorNameSorterStoreChange() {
        this.setState({
            authorNameSorterResult: AuthorNameSorterStore.getSortedList(),
            showLoading: AuthorNameSorterStore.getLoadingStatus()
        });
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
            outputHintText,
            copyToClipboardText,
            copyCompleteText,
            showLoading,
            loadingText,
            clearText,
            sortText
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
                    copyToClipboardText={copyToClipboardText}
                    copyCompleteText={copyCompleteText}
                    loadingText={loadingText}
                    clearText={clearText}
                    sortText={sortText}
                    onSortHandler={this._onSortHandler}
                    sortedResult={authorNameSorterResult}
                    onCopyToClipboardHandler={this._onCopyToClipboardHandler}
                    showLoading={showLoading} />
            </div>
        );
    }
}


export default AuthorNameSorterContainer;
