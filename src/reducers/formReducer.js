const initialState = {singleItem: [], isLoading: null};

export default function (state = initialState, action) {
    switch (action.type) {
        case "SINGLE_REQUEST_BEGIN":
            return {
                ...state,
                isLoading: true
            };
        case "SINGLE_REQUEST_SUCCESS":
            return { singleItem: action.item, isLoading: false };
        default:
            return state;
    }
}