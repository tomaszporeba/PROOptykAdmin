import React, {Component} from 'react';
import _ from 'lodash';
import {reduxForm, Field, initialize} from 'redux-form';
import {connect} from "react-redux";
import {getEyeglass} from "../../actions";
import {Link, withRouter} from 'react-router-dom';
import EyeglassField from "../utils/InputField";
import formFields from './formFields';

class EyeglassForm extends Component {


    componentDidMount() {
        this.handleInitialize();
    }


    async handleInitialize() {
        const eyeglass = await this.props.getEyeglass(window.location.pathname.split("/").pop());
        this.props.initialize(eyeglass);
    }

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

    _.each(formFields, ({name}) => {
        if (!values[name]) {
            errors[name] = "You must provide a value";
        }
    });

    if (!values.title) {
        errors.title = 'You must provide a title'
    }
    return errors;
}

EyeglassForm = connect(null, {getEyeglass})(withRouter(EyeglassForm));

export default reduxForm({
    validate,
    form: 'eyeglassForm',
    destroyOnUnmount: false
})(EyeglassForm);