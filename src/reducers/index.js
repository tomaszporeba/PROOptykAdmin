import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import listReducer from './listReducer';
import formReducer from "./formReducer";

export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    list: listReducer,
    formInput: formReducer
});