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

export function getSortedItems(listItems, keyValue) {
    return function (dispatch) {
        let isDescending;
        dispatch(getListOfItemsStart("LIST_REQUEST_BEGIN"));
        isDescending = listItems[0][keyValue] >= listItems.slice(-1).pop()[keyValue];
        isDescending ? listItems = listItems.sort((a, b) => (a[keyValue] > b[keyValue]) ? 1 : ((b[keyValue] > a[keyValue]) ? -1 : 0)) :
            listItems = listItems.sort((a, b) => (a[keyValue] < b[keyValue]) ? 1 : ((b[keyValue] < a[keyValue]) ? -1 : 0));
       return dispatch(getListOfItemsSuccess("LIST_REQUEST_SUCCESS", listItems))
    }


}

function getListOfItemsStart(type) {
    return {
        type
    }
}

export function getListOfItemsSuccess(type,items) {
    return {
        type,
        items
    }
}