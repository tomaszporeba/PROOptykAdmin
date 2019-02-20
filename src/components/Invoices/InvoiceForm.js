import React, {Component} from 'react';
import _ from 'lodash';
import {reduxForm, Field, initialize} from 'redux-form';
import {connect} from "react-redux";
import {getInvoice} from "../../actions";
import {Link, withRouter} from 'react-router-dom';
import InvoiceField from "../utils/InputField";
import formFields from './formFields';

class InvoiceForm extends Component {


    componentDidMount() {
        this.handleInitialize();
    }

    async handleInitialize() {
        const invoice = await this.props.getInvoice(window.location.pathname.split("/").pop());
        this.props.initialize(invoice);
    }

    renderFields() {
        return _.map(formFields, ({label, name, type}) => {
            return <Field
                key={name}
                component={InvoiceField}
                type={type}
                label={label}
                name={name}/>
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onInvoiceSubmit)}>
                    {this.renderFields()}
                    <Link to="/invoice" className="red btn-flat white-text">
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

InvoiceForm = connect(null, {getInvoice})(withRouter(InvoiceForm));

export default reduxForm({
    validate,
    form: 'invoiceForm',
    destroyOnUnmount: false
})(InvoiceForm);