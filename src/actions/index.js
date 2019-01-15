import axios from 'axios';
import {FETCH_USER, POST_EYEGLASS} from "./types";
// import apiServices from '../apiServices';


export const fetchUser = (values, history) => async dispatch => {

    const res = await axios.post("http://localhost:8000/auth/login", values);
    console.log(res.status + " code");
    if (res.status <300 && res.status>=200) {
        dispatch({type: FETCH_USER, token: res.data.token});
        history.push("/dashboard")
    }

};

export const saveEyeglass = (values, history) => async dispatch => {
    dispatch({type: POST_EYEGLASS});
    const res = await axios.post("http://localhost:8080/eyeglasses/add",
    values
    );
    history.push("/eyeglass")

};

