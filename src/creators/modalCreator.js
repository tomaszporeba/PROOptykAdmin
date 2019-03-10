export function showModal(formType) {
    return function (dispatch) {
        return dispatch({type: "OPEN_MODAL", formType: formType})
    }
}

export function closeModal() {
    return function (dispatch) {
        return dispatch({type: "CLOSE_MODAL"})
    }
}


