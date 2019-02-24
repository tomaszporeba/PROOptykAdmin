import axios from 'axios';

export default function requestMiddleware() {
    return ({ dispatch, getState }) => next => (action) => {
        // axios.defaults.headers.common['Authorization'] = localStorage.getItem('TOKEN');
    };
}