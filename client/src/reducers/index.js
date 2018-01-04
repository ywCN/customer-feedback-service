import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form'; // provided by redux-form lib
import authReducer from './authReducers';

// these keys are property names of the one Redux state object
export default combineReducers({
    auth: authReducer, // auth will be one of the property of Redux state object
    form: reduxForm
});
