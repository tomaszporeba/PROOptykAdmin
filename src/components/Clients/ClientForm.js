import React, {Component} from 'react';
import _ from 'lodash';
import {reduxForm, Field, initialize} from 'redux-form';
import {connect} from "react-redux";
import {getClient} from "../../actions";
import {Link, withRouter} from 'react-router-dom';
import ClientField from "../utils/InputField";
import formFields from './formFields';

class ClientForm extends Component {


    componentDidMount() {
        this.handleInitialize();
    }

    async handleInitialize() {
        const client = await this.props.getClient(window.location.pathname.split("/").pop());
        this.props.initialize(client);
    }

    renderFields() {
        return _.map(formFields, ({label, name, type}) => {
            return <Field
                key={name}
                component={ClientField}
                type={type}
                label={label}
                name={name}/>
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onClientSubmit)}>
                    {this.renderFields()}
                    <Link to="/client" className="red btn-flat white-text">
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

ClientForm = connect(null, {getClient})(withRouter(ClientForm));

export default reduxForm({
    validate,
    form: 'clientForm',
    destroyOnUnmount: false
})(ClientForm);