import React, {Component} from 'react';
import _ from 'lodash';
import {reduxForm, Field, initialize} from 'redux-form';
import {connect} from "react-redux";
import {getInvoice, getClients} from "../../actions";
import {Link, withRouter} from 'react-router-dom';
import InputField from "../utils/InputField";
import DropDownSelect from "../utils/DropDownSelect/DropDownSelect";
import formFields from './formFields';
import Modal from 'react-modal';
import './../utils/DropDownSelect/dropDownSelect.css'
import ClientNew from './../Clients/ClientNew'

class InvoiceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            clients: []
        };

        this.handleCloseModal = this.handleCloseModal.bind(this);

    }

    handleOpenModal() {
        this.setState({showModal: true});
    }

    handleCloseModal() {
        this.getClients();
        this.setState({showModal: false});
    }

    getClients = async () => {
        let clients = await this.props.getClients();
        clients = clients.map((client) => {
            client.label = `${client.name} ${client.lastName}`;
            return client
        });
        this.setState({clients});
    };

    componentDidMount() {
        this.getClients();
        this.handleInitialize();

    }

    async handleInitialize() {
        const invoice = await this.props.getInvoice(window.location.pathname.split("/").pop());
        this.props.initialize(invoice);
    }


    renderFields() {
        return _.map(formFields, ({label, name, type}) => {
            if (type === "select") {
                return (<Field
                    name="clientId"
                    label="Client"
                    component={DropDownSelect}
                    handleOpenModal={() => this.handleOpenModal()}
                    options={this.state.clients}
                />)
            } else {
                return <Field
                    key={name}
                    component={InputField}
                    type={type}
                    label={label}
                    name={name}/>
            }

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
                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="onRequestClose Example"
                    onRequestClose={this.handleCloseModal}
                    className="Modal"
                    overlayClassName="Overlay"
                >
                    <ClientNew handleModalSubmit={this.handleCloseModal} isModal={true}/>
                </Modal>
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
    return errors;
}

InvoiceForm = connect(null, {getInvoice, getClients})(withRouter(InvoiceForm));

export default reduxForm({
    validate,
    touchOnBlur: false,
    form: 'invoiceForm',
    destroyOnUnmount: false
})(InvoiceForm);