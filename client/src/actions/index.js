import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
    // path is from routes/authRouts.js
    // res is request
    const res = await axios.get('/api/current_user');
    // we only need the data property of the request
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

// this action creator takes a token and sends it to our backend api
export const handleToken = token => async dispatch => {
    // this respond is the updated user model with updated credit
    const res = await axios.post('/api/stripe', token);

    // dispatch this action with FETCH_USER type to reducers
    dispatch({ type: FETCH_USER, payload: res.data });
};
