import React , {Component} from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import {saveEyeglass, saveInvoice} from "../../actions";
import {closeModal} from "../../creators/modalCreator";

class EyeglassReview extends Component {


    handleSubmit = async () => {
        await this.props.saveEyeglass(this.props.formValues);
        if (this.props.isModal) {
            this.props.closeModal()

        } else {
            this.props.history.push("/eyeglass")
        }

    };
    reviewFields = _.map(formFields, ({ name, label }) => {
        return (
            <div className="review-field-container" key={ name }>
                <label>{ label }</label>
                <div>
                    { this.props.formValues[name]}
                </div>
            </div>
        );
    });

    render() {
        console.log(this.props);
        return (
            <div className="form-container">
                <h4>Please confirm your  entries</h4>
                { this.reviewFields }
                <button className="grey btn-flat white-text" onClick={ this.props.onCancel }>Cancel </button>
                <button onClick={ this.handleSubmit} className="black btn-flat right white-text">Save</button>
            </div>
        );
    }

};

function mapStateToProps(state) {
    return {
        formValues: state.form.eyeglassForm.values,
        isModal: state.modal.isModalOpen
    };
}


function mapDispatchToProps(dispatch) {
    return {
        closeModal: () => {
            dispatch(closeModal())
        },
        saveEyeglass: (values) => {
        dispatch(saveEyeglass(values))
    }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EyeglassReview));