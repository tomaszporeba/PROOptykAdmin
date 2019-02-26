import {AUTHENTICATED_REQUEST} from "../actions/types";

import axios from "axios/index";

export function getSingleItem(path) {
    return async function(dispatch) {
        dispatch({type: AUTHENTICATED_REQUEST});
        return axios.get(`http://localhost:8000/api/${path}`).then((response) => {
            dispatch(getSingleItemSuccess("SINGLE_REQUEST_SUCCESS", response.data))
        })
    }
}

function getListOfItemsStart(type) {
    return {
        type
    }
}

export function getSingleItemSuccess(type,item) {
    return {
        type,
        item
    }
}