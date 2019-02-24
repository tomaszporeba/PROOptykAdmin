import React, { Component } from 'react';
import EyeglassReview from './EyeglassReview';
import EyeglassForm from './EyeglassForm';
import { reduxForm } from 'redux-form';


class EyeglassNew extends Component{
    state = {
        showFormReview: false,
        isModal: this.props.isModal || false
    };

    handleModal = () =>  {
        this.props.handleModalSubmit()
    };
    renderContent() {
        if (this.state.showFormReview) {
            return <EyeglassReview handleModalSubmit={() =>  this.handleModal()} isModal={this.state.isModal} onCancel={() => this.setState({ showFormReview: false })}/>;
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