import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createMemoizeMiddleware } from 'compup/lib/memoize-actions';
import createMessageBusMiddleware from 'compup/lib/create-message-bus-middleware';
import { name as SERVICE_NAME } from '../package.json';


const rootReducer = combineReducers({
	/* eslint-disable global-require */
	events: require('./domain/events/reducer').default,
	eventParticipations: require('./domain/event-participations/reducer').default,
	selectedUsers: require('./domain/ui/selected-users').default,
});

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(
		ReduxThunk,
		createMemoizeMiddleware,
		createMessageBusMiddleware({ serviceName: SERVICE_NAME }),
	)),
);

export default store;
