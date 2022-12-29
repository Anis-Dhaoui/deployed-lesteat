import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { PlatesRed, StaffRed, CommentsRed, feedbackRed, LoginRed, WishListRed } from './Reducer';

export const appStore = () => {
	const store = createStore(
		combineReducers({
			plates: PlatesRed,
			staff: StaffRed,
			comments: CommentsRed,
			auth: LoginRed,
			wishlist: WishListRed,
			feedback: feedbackRed,
			...createForms({
				feedbackx: ""
			})
		}),
		applyMiddleware(thunk)
	);
	return store;
}