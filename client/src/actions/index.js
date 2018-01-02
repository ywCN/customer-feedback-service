import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
    // path is from routes/authRouts.js
    // res is request
    const res = await axios.get('/api/current_user');
    // we only need the data property of th request
    dispatch({ type: FETCH_USER, payload: res.data });
};

// before refactoring
// export const fetchUser = () => {
//     return function(dispatch) {
//         axios
//             .get('/api/current_user')
//             .then(res => dispatch({ type: FETCH_USER, payload: res }));
//     };
// };

export const handleToken = token => async dispatch => {
    const res = await axios.post('/api/stripe', token);

    dispatch({ type: FETCH_USER, payload: res.data });
};
