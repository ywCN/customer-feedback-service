import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
    // console.log(action);
    switch (action.type) {
        case FETCH_USER:
            // returns either null, false, or user modal
            return action.payload || false; // ''||false => false
        default:
            return state;
    }
}
