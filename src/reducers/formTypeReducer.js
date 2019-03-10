const initialState = {formType: ""};

export default function (state = initialState, action) {
    switch (action.type) {
        case "SET_FORM_TYPE":
            return {
                formType: action.formType
            };
        default:
            return state;
    }
}