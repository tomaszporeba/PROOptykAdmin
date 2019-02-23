import axios from 'axios';
import {AUTHENTICATED_REQUEST, FETCH_USER} from "./types";
// import apiServices from '../apiServices';


export const fetchUser = (values, history) => async dispatch => {
    const res = await axios.post("http://localhost:8000/auth/login", values);
    console.log(res.status + " code");
    if (res.status <300 && res.status>=200) {
        dispatch({type: FETCH_USER, token: res.data.token, user: res.data});
        history.push("/")
    }
};

export const getEyeglasses = (param) => async dispatch => {
    dispatch({type: AUTHENTICATED_REQUEST});
    const res = await axios.get("http://localhost:8000/api/eyeglass", {params:{search: param}});
    return res.data;
};

export const getEyeglass = (param) => async dispatch => {
    dispatch({type: AUTHENTICATED_REQUEST});
    const res = await axios.get(`http://localhost:8000/api/eyeglass/${param}`, );
    return res.data;
};

export const getInvoices = (param) => async dispatch => {
    dispatch({type: AUTHENTICATED_REQUEST});
    const res = await axios.get("http://localhost:8000/api/invoice", {params:{search: param}});
    return res.data;
};

export const getExaminations = (param) => async dispatch => {
    dispatch({type: AUTHENTICATED_REQUEST});
    const res = await axios.get("http://localhost:8000/api/examination", {params:{search: param}});
    return res.data;
};

export const getClients = (param) => async dispatch => {
    dispatch({type: AUTHENTICATED_REQUEST});
    const res = await axios.get("http://localhost:8000/api/client", {params:{search: param}});
    return res.data;
};

export const saveEyeglass = (values, history) => async dispatch => {
    dispatch({type: AUTHENTICATED_REQUEST});
    await axios.post(`http://localhost:8000/api/eyeglass/update`,
    values
    );
    history.push("/eyeglass")

};

export const saveClient = (values) => async dispatch => {
    dispatch({type: AUTHENTICATED_REQUEST});
    await axios.post(`http://localhost:8000/api/client/update`,
        values
    );

};

export const saveInvoice = (values, history) => async dispatch => {
    dispatch({type: AUTHENTICATED_REQUEST});
    await axios.post(`http://localhost:8000/api/invoice/update`,
        values
    );
    history.push("/invoice")

};

export const getInvoice = (param) => async dispatch => {
    dispatch({type: AUTHENTICATED_REQUEST});
    const res = await axios.get(`http://localhost:8000/api/invoice/${param}`, );
    return res.data;
};

export const getClient = (param) => async dispatch => {
    dispatch({type: AUTHENTICATED_REQUEST});
    const res = await axios.get(`http://localhost:8000/api/client/${param}`, );
    return res.data;
};

