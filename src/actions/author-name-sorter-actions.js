import AppDispatcher from '../dispatcher/app-dispatcher';
import FluxConstants from '../constants/flux-constants';
import Api from '../service/api.js';

let AuthorNameSorterActions = {
	sortListByAuthorStroke(list) {

		let charStrokeMap = {};

		let seperatorRegex = /[ ,.、。，\n]/gi;

		let authorNames = list.map((item) => {
			return item.slice(0, item.search(seperatorRegex));
		});

		let namePromises = authorNames.map((name) => {
			return name.split('').map((char) => {
				return Api.getCharacterInformation(char);
			});
		});

		let characterPromises = namePromises.map((name) => {
			let deferred = $.Deferred();
			$.when.apply($, name).then((...responses) => {
				let result = responses.map((res) => {
					return {
						char: res[0].title,
						stroke: res[0].stroke_count
					};
				});
				deferred.resolve(result);
			}, () => {
				deferred.reject('fetch character information failed');
			});
			return deferred.promise();
		});

		$.when.apply($, characterPromises).then((...responses) => {
			responses.forEach((name) => {
				name.forEach((char) => {
					charStrokeMap[char.char] = char.stroke;
				});
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
