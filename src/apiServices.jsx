import React from 'react';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:8080';



export default {
    post: (url, body) => axios.post(`${BACKEND_URL}${url}`, body, {withCredentials: true})
        .then(res => res.data)
        .catch (() => {
            return Promise.reject();
        }),
    get: (url, params) => axios.get(`${BACKEND_URL}${url}`, {params})
        .then(res => { return res.data })
        .catch(() => {
            return Promise.reject();
        })
}