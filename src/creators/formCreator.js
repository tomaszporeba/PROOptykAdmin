import {AUTHENTICATED_REQUEST} from "../actions/types";

import axios from "axios/index";
import moment from "moment";

export function getSingleItem(path) {
    return async function(dispatch) {
        dispatch({type: AUTHENTICATED_REQUEST});
        return axios.get(`http://localhost:8000/api/${path}`).then((response) => {
            let dates = ['orderDate', 'scheduledDate'];
            for (let key in response.data) {
                if (dates.includes(key)) {
                    response.data[key] = moment(response.data[key]).format("YYYY-MM-DD")
                }
            }
            dispatch(getSingleItemSuccess("SINGLE_REQUEST_SUCCESS", response.data))
        })
    }
}

export function setFormType(formType) {
    return async function(dispatch) {
        return dispatch({type: "SET_FORM_TYPE", formType})
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