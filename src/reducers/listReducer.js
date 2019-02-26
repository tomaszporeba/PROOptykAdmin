
export default function (state = {listItems:[]}, action) {
    switch (action.type) {
        case "LIST_REQUEST_BEGIN":
            return state;
        case "LIST_REQUEST_SUCCESS":
            return { listItems: action.items };
        default:
            return state;
    }
}