import axios from 'axios';

export default function requestMiddleware() {
    return ({ dispatch, getState }) => next => (action) => {


        console.log("action " + action)

        // console.log("czy tu włazi " + getState.token);
        // axios.defaults.headers.common['Authorization'] = localStorage.getItem('TOKEN');
    };
}