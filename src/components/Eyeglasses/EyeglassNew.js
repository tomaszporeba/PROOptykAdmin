import React, { Component } from 'react';
import EyeglassReview from './EyeglassReview';
import EyeglassForm from './EyeglassForm';
import { reduxForm } from 'redux-form';


class EyeglassNew extends Component{
    state = {
        showFormReview: false,
    };

    handleModal = () =>  {
        this.props.handleModalSubmit()
    };
    renderContent() {
        if (this.state.showFormReview) {
            return <EyeglassReview handleModalSubmit={() =>  this.handleModal()} onCancel={() => this.setState({ showFormReview: false })}/>;
        } else {
            return <EyeglassForm onEyeglassSubmit={() => this.setState({ showFormReview: true })}/>;

        }

    }

    render() {
        return (
            <div className="form-content">
                {this.renderContent()}
            </div>
        );
    }
}

export default EyeglassNew