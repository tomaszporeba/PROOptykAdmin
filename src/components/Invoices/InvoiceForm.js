import React, {Component} from 'react';
import _ from 'lodash';
import {reduxForm, Field, initialize} from 'redux-form';
import {connect} from "react-redux";
import {getInvoice, getClients, getClient} from "../../actions";
import {Link, withRouter} from 'react-router-dom';
import InputField from "../utils/InputField";
import DropDownSelect from "../utils/DropDownSelect/DropDownSelect";
import formFields from './formFields';
import './../utils/DropDownSelect/dropDownSelect.css'
import ModalHelper from "../utils/Modal/ModalHelper";
import {getListOfItems} from "../../creators/listCreator";

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
        this.props.getListItems('/client','');
        this.setState({showModal: false});
    }

    componentDidMount() {
        this.props.getListItems('/client','');
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
                    options={this.props.listItems.map(client => {client.label = `${client.name} ${client.lastName}`; return client})}
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
                    <button onClick={this.props.history.goBack} className="red btn-flat white-text">
                        Cancel
                    </button>
                    <button type="submit" className="black btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
                {<ModalHelper handleCloseModal={this.handleCloseModal} isOpen={this.state.showModal} formType={"client"} />}

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

const mapStateToProps= (state) => {
    return {listItems: state.list.listItems,
        isLoading: state.list.isLoading}
} ;


function mapDispatchToProps(dispatch) {
    return {
        getListItems: (path, sortType) => {dispatch(getListOfItems(path, sortType))},
        getInvoice
    }
}


InvoiceForm = connect(mapStateToProps, mapDispatchToProps)(withRouter(InvoiceForm));

export default reduxForm({
    validate,
    touchOnBlur: false,
    form: 'invoiceForm',
    destroyOnUnmount: false
})(InvoiceForm);