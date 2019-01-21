import {AUTHENTICATED, AUTHENTICATION_ERROR, FETCH_USER, POST_EYEGLASS, UNAUTHENTICATED, GET_EYEGLASS} from "../actions/types";
import axios from 'axios';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_USER:
            localStorage.setItem('TOKEN', action.token);
            localStorage.setItem('USER', JSON.stringify(action.user));
            return localStorage.getItem('TOKEN') || false;
        case POST_EYEGLASS:
            console.log("token in authReduces " + localStorage.getItem('TOKEN') );
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('TOKEN');
            return "ok";
        case GET_EYEGLASS:
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('TOKEN');
        case AUTHENTICATED:
            return {...state, authenticated:true};
        case UNAUTHENTICATED:
            return {...state, authenticated:false};
        case AUTHENTICATION_ERROR:
            return {...state, error: action.payload};
        default:
            return state;
    }
}