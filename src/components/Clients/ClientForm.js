import React, {Component} from 'react';
import _ from 'lodash';
import {reduxForm, Field, initialize} from 'redux-form';
import {connect} from "react-redux";
import {getClient} from "../../actions";
import {Link, withRouter} from 'react-router-dom';
import InputField from "../utils/InputField";
import formFields from './formFields';
import DropDownSelect from "../utils/DropDownSelect/DropDownSelect";
import ModalHelper from "../utils/Modal/ModalHelper";
import {getListOfItems} from "../../creators/listCreator";
import {getSingleItem} from "../../creators/formCreator";

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
        this.props.getListItems('/eyeglass', '');
        this.setState({showModal: false});
    }
    componentDidMount() {
        this.props.getListItems('/eyeglass','');
        let path = window.location.pathname.split('/');
        this.props.getItem(`${path[1]}/${path[3]}`);
        this.props.initialize(this.props.singleItem);
    }

    renderFields() {
        return _.map(formFields, ({label, name, type}) => {
            if (type === "select") {
                return (<Field
                    name="eyeglassId"
                    label="Eyeglass"
                    defaultValue={this.props.initialValues.eyeglassId}
                    component={DropDownSelect}
                    handleOpenModal={() => this.handleOpenModal()}
                    options={this.props.listItems.map(eyeglass => {eyeglass.label = `${eyeglass.holder_name}`; return eyeglass})}
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
            <div className="form-container">
                <form onSubmit={this.props.handleSubmit(this.props.onClientSubmit)}>
                    <h4>Please fill fields</h4>
                    {this.renderFields()}
                    <button onClick={this.props.history.goBack} className="grey btn-flat white-text">
                        Cancel
                    </button>
                    <button type="submit" className="black btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
                <ModalHelper handleCloseModal={this.handleCloseModal} isOpen={this.state.showModal} formType={"eyeglass"}/>
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
        initialValues: state.formInput.singleItem,
        isLoading: state.list.isLoading}
} ;


function mapDispatchToProps(dispatch) {
    return {
        getListItems: (path, sortType) => {dispatch(getListOfItems(path, sortType))},
        getItem: (path) => {dispatch(getSingleItem(path))}
    }
}

ClientForm = reduxForm({
    validate,
    form: 'clientForm',
    destroyOnUnmount: false
})(ClientForm);

ClientForm = connect(mapStateToProps, mapDispatchToProps)(withRouter(ClientForm));

export default ClientForm;