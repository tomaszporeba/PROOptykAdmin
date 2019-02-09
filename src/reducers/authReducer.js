import {FETCH_USER, AUTHENTICATED_REQUEST} from "../actions/types";
import axios from 'axios';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_USER:
            localStorage.setItem('TOKEN', action.token);
            localStorage.setItem('USER', JSON.stringify(action.user));
            return { token : localStorage.getItem('TOKEN') || false};
        case AUTHENTICATED_REQUEST:
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('TOKEN');
            return state;
        default:
            return state;
    }
}