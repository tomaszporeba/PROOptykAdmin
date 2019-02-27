import axios from 'axios';
import {AUTHENTICATED_REQUEST, FETCH_USER} from "./types";


export const fetchUser = (values, history) => async dispatch => {
    const res = await axios.post("http://localhost:8000/auth/login", values);
    if (res.status <300 && res.status>=200) {
        dispatch({type: FETCH_USER, token: res.data.token, user: res.data});
        history.push("/")
    }
};


export const saveEyeglass = (values) => async dispatch => {
    dispatch({type: AUTHENTICATED_REQUEST});
    await axios.post(`http://localhost:8000/api/eyeglass/update`,
    values
    );
};

export const saveClient = (values) => async dispatch => {
    dispatch({type: AUTHENTICATED_REQUEST});
    await axios.post(`http://localhost:8000/api/client/update`,
        values
    );

};

export const saveInvoice = (values) => async dispatch => {
    dispatch({type: AUTHENTICATED_REQUEST});
    await axios.post(`http://localhost:8000/api/invoice/update`,
        values
    );

};


export const saveExamination = (values) => async dispatch => {
    dispatch({type: AUTHENTICATED_REQUEST});
    await axios.post(`http://localhost:8000/api/examination/update`,
        values
    );

};

