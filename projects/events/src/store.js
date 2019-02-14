import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createMemoizeMiddleware } from 'compup/lib/memoize-actions';

const rootReducer = combineReducers({
	/* eslint-disable global-require */
	events: require('./domain/events/reducer').default,
	eventParticipations: require('./domain/event-participations/reducer').default,
});

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(
		ReduxThunk,
		createMemoizeMiddleware,
	)),
);

export default store;
