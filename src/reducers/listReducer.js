

const initialState = {listItems: [], isLoading: false};

export default function (state = initialState, action) {
    switch (action.type) {
        case "LIST_REQUEST_BEGIN":
            return {
                ...state,
                isLoading: true
            };
        case "LIST_REQUEST_SUCCESS":
            return { listItems: action.items, isLoading: false };
        default:
            return state;
    }
}