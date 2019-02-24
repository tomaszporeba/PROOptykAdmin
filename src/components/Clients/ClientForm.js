import React, {Component} from 'react';
import _ from 'lodash';
import {reduxForm, Field, initialize} from 'redux-form';
import {connect} from "react-redux";
import {getClient, getEyeglasses} from "../../actions";
import {Link, withRouter} from 'react-router-dom';
import InputField from "../utils/InputField";
import formFields from './formFields';
import DropDownSelect from "../utils/DropDownSelect/DropDownSelect";
import Modal from 'react-modal';
import EyeglassNew from "./../Eyeglasses/EyeglassNew";

class ClientForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            eyeglasses: []
        };
        this.handleCloseModal = this.handleCloseModal.bind(this);

    }

    handleOpenModal() {
        this.setState({showModal: true});
    }

    handleCloseModal() {
        this.getEyeglasses();
        this.setState({showModal: false});
    }
    componentDidMount() {
        this.getEyeglasses();
        this.handleInitialize();
    }

    getEyeglasses = async () => {
        let eyeglasses = await this.props.getEyeglasses();
        eyeglasses = eyeglasses.map((eyeglass) => {
            eyeglass.label = `${eyeglass.holder_name}`;
            return eyeglass
        });
        this.setState({eyeglasses});
    };

    async handleInitialize() {
        const eyeglass = await this.props.getClient(window.location.pathname.split("/").pop());
        this.props.initialize(eyeglass);
    }

    renderFields() {
        return _.map(formFields, ({label, name, type}) => {
            if (type === "select") {
                return (<Field
                    name="eyeglassId"
                    label="Eyeglass"
                    component={DropDownSelect}
                    handleOpenModal={() => this.handleOpenModal()}
                    options={this.state.eyeglasses}
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
                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="onRequestClose Example"
                    onRequestClose={this.handleCloseModal}
                    className="Modal"
                    overlayClassName="Overlay"
                >
                    <EyeglassNew handleModalSubmit={this.handleCloseModal} isModal={true}/>
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

ClientForm = connect(null, {getClient, getEyeglasses})(withRouter(ClientForm));

export default reduxForm({
    validate,
    form: 'clientForm',
    destroyOnUnmount: false
})(ClientForm);