import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
    // console.log(action);
    switch (action.type) {
        // This reducer produces the 'auth' property of Redux state object.
        case FETCH_USER:
            // returns either null, false, or user modal
            return action.payload || false; // ''||false => false
        default:
            return state;
    }
}
