

const initialState = {listItems: [], isLoading: null};

export default function (state = initialState, action) {
    switch (action.type) {
        case "LIST_REQUEST_BEGIN":
            return {
                ...state,
                isLoading: true
            };
        case "LIST_REQUEST_SUCCESS":
            console.log(action.items);
            return { listItems: action.items, isLoading: false };
        default:
            return state;
    }
}