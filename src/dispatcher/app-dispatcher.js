import {Dispatcher} from 'flux';

class AppDispatcher extends Dispatcher {
    handleApiAction(action) {
        this.dispatch({
            source: 'API_ACTION',
            action: action
        });
    }
    handleViewAction(action) {
        this.dispatch({
            source: 'VIEW_ACTION',
            action: action
        });
    }
}

let _AppDispatcher = new AppDispatcher();

export default _AppDispatcher;
