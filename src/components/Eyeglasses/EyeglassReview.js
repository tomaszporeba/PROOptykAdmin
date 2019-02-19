import React , {Component} from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import {saveEyeglass} from "../../actions";




class EyeglassReview extends Component {


    submit = () => {
        this.props.saveEyeglass(this.props.formValues, this.props.history);
    };
    reviewFields = _.map(formFields, ({ name, label }) => {
        return (
            <div key={ name }>
                <label>{ label }</label>
                <div>
                    { this.props.formValues[name]}
                </div>
            </div>
        );
    });

    render() {
        return (
            <div>
                <p>Please confirm your  entries</p>
                { this.reviewFields }
                <button className="red btn-flat white-text" onClick={ this.props.onCancel }>Cancel </button>
                <button onClick={ this.submit} className="black btn-flat right white-text">Save</button>
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