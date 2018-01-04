import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import 'materialize-css/dist/css/materialize.min.css';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

// for testing
import axios from 'axios';
window.axios = axios;
// after logged in, enter following in console, then check mailbox
// const survey = { title: 'a title', subject: 'a subject', recipients: 'your_gmail@gmail.com', body: 'a body' };
// axios.post('/api/surveys', survey);

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);

// console.log(process.env.REACT_APP_STRIPE_KEY); // key
// console.log(process.env.NODE_ENV); // environment
