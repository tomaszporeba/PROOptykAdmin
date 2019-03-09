import React , {Component} from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import {saveEyeglass} from "../../actions";

class EyeglassReview extends Component {


    handleSubmit = async () => {
        await this.props.saveEyeglass(this.props.formValues);
        if (this.props.isModal) {
            this.props.handleModalSubmit()

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
        return (
            <div className="form-container">
                <h4>Please confirm your  entries</h4>
                { this.reviewFields }
                <button className="red btn-flat white-text" onClick={ this.props.onCancel }>Cancel </button>
                <button onClick={ this.handleSubmit} className="black btn-flat right white-text">Save</button>
            </div>
        );
    }

};

function mapStateToProps(state) {
    return {
        formValues: state.form.eyeglassForm.values
    };
    
}

export default connect(mapStateToProps, {saveEyeglass})(withRouter(EyeglassReview));