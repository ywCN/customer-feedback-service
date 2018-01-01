import { combineReducers } from 'redux';
import authReducer from './authReducers';

export default combineReducers({
    auth: authReducer // auth will be in the props if connect by a Component
});
