import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import listReducer from './listReducer';
import formReducer from "./formReducer";
import modalReducer from "./modalReducer";
import formTypeReducer from "./formTypeReducer";

export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    list: listReducer,
    formInput: formReducer,
    modal: modalReducer,
    formType: formTypeReducer
});