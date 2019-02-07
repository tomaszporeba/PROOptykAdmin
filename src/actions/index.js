import axios from 'axios';
import {FETCH_USER, GET_EYEGLASS, POST_EYEGLASS} from "./types";
// import apiServices from '../apiServices';


export const fetchUser = (values, history) => async dispatch => {

    const res = await axios.post("http://localhost:8000/auth/login", values);
    console.log(res.status + " code");
    if (res.status <300 && res.status>=200) {
        dispatch({type: FETCH_USER, token: res.data.token, user: res.data});
        history.push("/")
    }

};

export const getEyeglasses = () => async dispatch => {
    dispatch({type: GET_EYEGLASS});
    const res = await axios.get("http://localhost:8000/api/eyeglass");
    console.log(res.data);
    return res.data;
};

export const saveEyeglass = (values, history) => async dispatch => {
    dispatch({type: POST_EYEGLASS});
    const res = await axios.post("http://localhost:8080/eyeglasses/add",
    values
    );
    history.push("/eyeglass")

};

