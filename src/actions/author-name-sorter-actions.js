import AppDispatcher from '../dispatcher/app-dispatcher';
import FluxConstants from '../constants/flux-constants';
import Api from '../service/api.js';

let AuthorNameSorterActions = {
	sortListByAuthorStroke(list) {
		let charStrokeMap = {},
		    charactersNeedToBeLookUp = [],
		    seperatorRegex = /[ ,.、。，\n]/gi,
		    authorNames = list.map((item) => {
			    return item.slice(0, item.search(seperatorRegex));
		    }),
		    characterPromises;

		authorNames.forEach((name) => {
			name.split('').forEach((char) => {
				if(char !== '' && charactersNeedToBeLookUp.indexOf(char) === -1) {
					charactersNeedToBeLookUp.push(char);
				}
			});
		});
		console.log(authorNames);
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
	            	originalList: list,
	            	charStrokeMap: charStrokeMap
	            }
	        });
		}, (err) => {
			console.log(err);
		});
	}
};

export default AuthorNameSorterActions;
