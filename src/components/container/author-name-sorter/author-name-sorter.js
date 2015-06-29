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

class AuthorNameSorterContainer extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = {
			authorNameSorterResult: ''
		};
		this._bind(
			'_onAuthorNameSorterStoreChange'
		);
	}
	componentDidMount() {
		AuthorNameSorterStore.addChangeListener(this._onAuthorNameSorterStoreChange);
	}
	componentWillUnmount() {
        AuthorNameSorterStore.removeChangeListener(this._onAuthorNameSorterStoreChange);
    }
    _onAuthorNameSorterStoreChange() {
    	this.setState({
    		authorNameSorterResult: AuthorNameSorterStore.getSortedList()
    	});
    }
    render() {
    	const {
    		authorNameSorterResult
    	} = this.state;

        return (
        	<div className="dissertion-helper">
                <AuthorNameSorter
                    onSortHandler={AuthorNameSorterActions.sortListByAuthorStroke}
                    sortedResult={authorNameSorterResult}/>
            </div>
        );
    }
}


export default AuthorNameSorterContainer;
