import React, {Component} from 'react';
import _ from 'lodash';
import {reduxForm, Field} from 'redux-form';
import { Link } from 'react-router-dom';
import EyeglassField from "./EyeglassField";
import formFields from './formFields';

class EyeglassForm extends Component {

    renderFields() {
        return _.map(formFields, ({label, name, type}) => {
            return <Field
                key={name}
                component={EyeglassField}
                type={type}
                label={label}
                name={name}/>
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onEyeglassSubmit)}>
                    {this.renderFields()}
                    <Link to="/eyeglass" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button type="submit" className="black btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    _.each(formFields, ({ name }) => {
       if (!values[name]) {
           errors[name] = "You must provide a value";
       }
    });

    if (!values.title) {
        errors.title = 'You must provide a title'
    }
    return errors;
}

export default reduxForm({
    validate,
    form: 'eyeglassForm',
    destroyOnUnmount: false
})(EyeglassForm);