import React, {Component} from 'react';
import _ from 'lodash';
import {reduxForm, Field, initialize} from 'redux-form';
import {connect} from "react-redux";
import {getEyeglass} from "../../actions";
import {Link, withRouter} from 'react-router-dom';
import EyeglassField from "../utils/InputField";
import formFields from './formFields';
import {getListOfItems} from "../../creators/listCreator";
import {getSingleItem} from "../../creators/formCreator";

class EyeglassForm extends Component {


    componentDidMount() {
        let path = window.location.pathname.split('/');
        this.props.getItem(`${path[1]}/${path[3]}`);
        this.props.initialize(this.props.singleItem);
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
                    <button onClick={this.props.history.goBack} className="red btn-flat white-text">
                        Cancel
                    </button>
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

const mapStateToProps= (state) => {
    console.log(state);
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


EyeglassForm = reduxForm({
    validate,
    form: 'clientForm',
    destroyOnUnmount: false
})(EyeglassForm);

EyeglassForm = connect(mapStateToProps, mapDispatchToProps)(withRouter(EyeglassForm));

export default EyeglassForm;