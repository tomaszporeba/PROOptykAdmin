import {AUTHENTICATED_REQUEST} from "../actions/types";

import axios from "axios/index";

export function getListOfItems(path, param) {
    return async function(dispatch) {
        dispatch({type: AUTHENTICATED_REQUEST});
        dispatch(getListOfItemsStart("LIST_REQUEST_BEGIN"));
        return axios.get(`http://localhost:8000/api${path}`, {params:{search: param}}).then((response) => {
            dispatch(getListOfItemsSuccess("LIST_REQUEST_SUCCESS", response.data))
        })
    }
}

function getListOfItemsStart(type) {
    return {
        type
    }
}

export function getListOfItemsSuccess(type,items) {
    console.log(items);
    return {
        type,
        items
    }
}