import React, { Component } from 'react';
import EyeglassReview from './EyeglassReview';
import EyeglassForm from './EyeglassForm';
import { reduxForm } from 'redux-form';


class EyeglassNew extends Component{
    state = { showFormReview: false };

    renderContent() {
        if (this.state.showFormReview) {
            return <EyeglassReview onCancel={() => this.setState({ showFormReview: false })}/>;
        }

        return <EyeglassForm onEyeglassSubmit={() => this.setState({ showFormReview: true })}/>;
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default reduxForm(
    {
        form: 'eyeglassForm'
    }
)(EyeglassNew);