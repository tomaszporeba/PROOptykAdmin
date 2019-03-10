const initialState = {formType: "", isModalOpen:false};

export default function (state = initialState, action) {
    switch (action.type) {
        case "OPEN_MODAL":
            return {
                isModalOpen: true,
                formType: action.formType
            };
        case "CLOSE_MODAL":
            return {
                isModalOpen: false,
                formType: ""
            };
        default:
            return state;
    }
}