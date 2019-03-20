import React, {Component} from 'react';
import _ from 'lodash';
import {reduxForm, Field, initialize, getFormValues} from 'redux-form';
import {connect} from "react-redux";
import {getClient} from "../../actions";
import {Link, withRouter} from 'react-router-dom';
import InputField from "../utils/InputField";
import formFields from './formFields';
import DropDownSelect from "../utils/DropDownSelect/DropDownSelect";
import ModalHelper from "../utils/Modal/ModalHelper";
import {getListOfItems} from "../../creators/listCreator";
import {getSingleItem} from "../../creators/formCreator";
import {setFormType} from "../../creators/formCreator";
import moment from "moment/moment";

class ClientForm extends Component {

    componentDidMount() {
        this.props.getListItems('/eyeglass', '');
    }
    async shouldComponentUpdate(nextProps, nextState) {
        if (nextProps !== this.props) {
            let path = window.location.pathname.split('/');
            await this.props.getItem(`${path[1]}/${path[3]}`);
            let singleItem = nextProps.values;
            await initialize(singleItem);
            return true
        } else return false
    }

    renderFields() {
        return _.map(formFields, ({label, name, type}) => {
            if (type === "select") {
                return (<Field
                    name="eyeglassId"
                    label="Eyeglass"
                    defaultValue={this.props.initialValues.eyeglassId}
                    formType="eyeglass"
                    component={DropDownSelect}
                    options={this.props.listItems.map(eyeglass => {
                        eyeglass.label = `${eyeglass.holder_name}`;
                        return eyeglass
                    })}
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
                <ModalHelper/>
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

const mapStateToProps = (state) => {
    return {
        listItems: state.list.listItems,
        initialValues: state.formInput.singleItem,
        isLoading: state.list.isLoading,
        isModalOpen: state.modal.isModalOpen
    }
};


function mapDispatchToProps(dispatch) {
    return {
        getListItems: (path, sortType) => {
            dispatch(getListOfItems(path, sortType))
        },
        getItem: (path) => {
            dispatch(getSingleItem(path))
        }
    }
}

ClientForm = connect(
    state => ({
        values: getFormValues('clientForm')(state),
    })
)(ClientForm);

ClientForm = reduxForm({
    validate,
    form: 'clientForm',
    destroyOnUnmount: false,
    enableReinitialize: true
})(ClientForm);

ClientForm = connect(mapStateToProps, mapDispatchToProps)(withRouter(ClientForm));

export default ClientForm;