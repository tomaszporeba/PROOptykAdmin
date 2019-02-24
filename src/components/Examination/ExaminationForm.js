import React, {Component} from 'react';
import _ from 'lodash';
import {reduxForm, Field, initialize} from 'redux-form';
import {connect} from "react-redux";
import {getExamination, getClients} from "../../actions";
import {Link, withRouter} from 'react-router-dom';
import InputField from "../utils/InputField";
import formFields from './formFields';
import DropDownSelect from "../utils/DropDownSelect/DropDownSelect";
import Modal from 'react-modal';
import ClientNew from "./../Clients/ClientNew";
import ModalHelper from "../utils/Modal/ModalHelper";


class ExaminationForm extends Component {
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
    componentDidMount() {
        this.getClients();
        this.handleInitialize();
    }

    getClients = async () => {
        let clients = await this.props.getClients();
        clients = clients.map((client) => {
            client.label = `${client.name} ${client.lastName}`;
            return client
        });
        this.setState({clients});
    };

    async handleInitialize() {
        const examination = await this.props.getExamination(window.location.pathname.split("/").pop());
        this.props.initialize(examination);
    }

    renderFields() {
        return _.map(formFields, ({label, name, type}) => {
            console.log(type);
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
                <form onSubmit={this.props.handleSubmit(this.props.onExaminationSubmit)}>
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

ExaminationForm = connect(null, {getExamination, getClients})(withRouter(ExaminationForm));

export default reduxForm({
    validate,
    form: 'examinationForm',
    destroyOnUnmount: false
})(ExaminationForm);