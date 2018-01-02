import { combineReducers } from 'redux';
import authReducer from './authReducers';

export default combineReducers({
    auth: authReducer // auth will be one of the property of Redux state object
});
