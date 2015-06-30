import AppDispatcher from '../dispatcher/app-dispatcher';
import FluxConstants from '../constants/flux-constants';
import Api from '../service/api.js';

let AuthorNameSorterActions = {
	sortListByAuthorStroke(list) {
		let charStrokeMap = {},
		    charactersNeedToBeLookUp = [],
		    seperatorRegex = /[ ,.、。，\n]/,
		    englishRegex = /^[a-zA-Z]$/,
		    chineseRegex = /[\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF]/,
		    lineSeparatorRegex = /[^\u00a0\u1680\u180e\u2000-\u200a\u2028-\u2029\u202f\u205f\u3000\uFFF9-\uFFFF]/,
		    chineseReferenceList = [],
		    englishReferenceList = [],
		    authorNames = list.map((item) => {
			    return item.slice(0, item.search(seperatorRegex)).split('').filter((char) => {
		    		return char.match(chineseRegex) || char.match(englishRegex);
		    	}).join('');
		    }),
		    characterPromises;

		authorNames.forEach((name, index) => {
			let isFirstCharacterEnglish = name.length > 0 && name[0].match(englishRegex),
			    isFirstCharacterChinese = name.length > 0 && name[0].match(chineseRegex),
			    item = list[index].split('').filter((char) => char.match(lineSeparatorRegex)).join('');

			if(isFirstCharacterEnglish) {
				englishReferenceList.push(item);
			}
			if(isFirstCharacterChinese) {
				chineseReferenceList.push(item);
			}
			name.split('').forEach((char) => {
				let isChineseLetter = char.match(chineseRegex);
				if(isChineseLetter && charactersNeedToBeLookUp.indexOf(char) === -1) {
					charactersNeedToBeLookUp.push(char);
				}
			});
		});
		characterPromises = charactersNeedToBeLookUp.map((char) => {
			return Api.getCharacterInformation(char);
		});
		$.when.apply($, characterPromises).then((...responses) => {
			responses.forEach((res) => {
				let title = res[0].title,
				    strokes = res[0].stroke_count;
				charStrokeMap[title] = strokes;
			});
			AppDispatcher.handleViewAction({
	            actionType: FluxConstants.SORT_AUTHOR_BY_NAME,
	            data      : {
	            	englishList: englishReferenceList,
	            	chineseList: chineseReferenceList,
	            	charStrokeMap: charStrokeMap
	            }
	        });
		}, (err) => {
			console.log(err);
		});
	}
};

export default AuthorNameSorterActions;
