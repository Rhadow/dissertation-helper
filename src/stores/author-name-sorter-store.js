import AppDispatcher from '../dispatcher/app-dispatcher';
import FluxConstants from '../constants/flux-constants';
import { EventEmitter } from 'events';

class AuthorNameSorterStore extends EventEmitter{
    constructor() {
        super();
        this._listSortedByAuthorName = '';
    }

    emitChange() {
        this.emit('change');
    }

    addChangeListener(callback) {
        this.on('change', callback);
    }

    removeChangeListener(callback) {
        this.removeListener('change', callback);
    }

    sortAuthorByName(data) {
        let charStrokeMap = data.charStrokeMap,
            chineseResult = data.chineseList.slice(0).filter((item) => item !== ''),
            englishResult = data.englishList.slice(0).filter((item) => item !== ''),
            sameStrokeMap = [];

        chineseResult.sort((item, nextItem) => {
            let seperatorRegex = /[ ,.、。，\n]/gi,
                authorName = item.slice(0, item.search(seperatorRegex)),
                nextAuthorName = nextItem.slice(0, nextItem.search(seperatorRegex)),
                compareLength = authorName.length >= nextAuthorName.length ? authorName.length : nextAuthorName.length;

            for(let i = 0; i < compareLength; i++) {
                if(i < authorName.length && i >= nextAuthorName.length) {
                    return 1;
                }
                if(i >= authorName.length && i < nextAuthorName.length) {
                    return -1;
                }
                if(i >= authorName.length && i >= nextAuthorName.length) {
                    return 0;
                }
                if(authorName[i] === nextAuthorName[i]) {
                    continue;
                }
                if(charStrokeMap[authorName[i]] === charStrokeMap[nextAuthorName[i]]) {
                    if(sameStrokeMap.indexOf(authorName[i]) === -1) {
                        sameStrokeMap.push(authorName[i]);
                    }
                    if(sameStrokeMap.indexOf(nextAuthorName[i]) === -1) {
                        sameStrokeMap.push(nextAuthorName[i]);
                    }
                    return sameStrokeMap.indexOf(authorName[i]) - sameStrokeMap.indexOf(nextAuthorName[i]);
                }
                return charStrokeMap[authorName[i]] - charStrokeMap[nextAuthorName[i]];
            }
        });
        englishResult.sort((item, nextItem) => {
            return item.toLowerCase().localeCompare(nextItem.toLowerCase());
        });
        this._listSortedByAuthorName = chineseResult.concat(englishResult).join('\n\n');
    }

    getSortedList() {
        return this._listSortedByAuthorName;
    }
}

let _AuthorNameSorterStore = new AuthorNameSorterStore();

_AuthorNameSorterStore.dispatchToken = AppDispatcher.register((payload) => {
    let action = payload.action;
    switch(action.actionType){
        case FluxConstants.SORT_AUTHOR_BY_NAME:
            _AuthorNameSorterStore.sortAuthorByName(action.data);
        break;
        default:
           return true;
    }
    _AuthorNameSorterStore.emitChange();
    return true;
});

export default _AuthorNameSorterStore;
