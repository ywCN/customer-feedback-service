import axios from 'axios';
import { FETCH_USER } from './types';

const fetchUser = () => {
    // routes/authRouts.js
    axios.get('/api/current_user');
};
