import AppDispatcher from '../dispatcher/app-dispatcher';
import FluxConstants from '../constants/flux-constants';
import Api from '../service/api.js';

let AuthorNameSorterActions = {
	sortListByAuthorStroke(list) {
		let charStrokeMap = {},
		    charactersNeedToBeLookUp = [],
		    seperatorRegex = /[ ,.、。，\n]/gi,
		    englishRegex = /^[a-zA-Z]$/,
		    chineseReferenceList = [],
		    englishReferenceList = [],
		    authorNames = list.map((item) => {
			    return item.slice(0, item.search(seperatorRegex));
		    }),
		    characterPromises;

		authorNames.forEach((name, index) => {
			let isFirstCharacterEnglish = englishRegex.test(name[0]);
			if(isFirstCharacterEnglish) {
				englishReferenceList.push(list[index]);
			}
			else {
				chineseReferenceList.push(list[index]);
			}
			name.split('').forEach((char) => {
				let isEnglishLetter = englishRegex.test(char);
				if(!isEnglishLetter && charactersNeedToBeLookUp.indexOf(char) === -1) {
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
