import React, { Component } from 'react';
import ExaminationReview from './ExaminationReview';
import ExaminationForm from './ExaminationForm';
import { reduxForm } from 'redux-form';

class ExaminationNew extends Component{
    state = {
        showFormReview: false,
        isModal: this.props.isModal || false
    };

    handleModal = () =>  {
        this.props.handleModalSubmit()
    };


    renderContent() {
        if (this.state.showFormReview) {
            return <ExaminationReview handleModalSubmit={() =>  this.handleModal()} isModal={this.state.isModal} onCancel={() => this.setState({ showFormReview: false })}/>;
        }

        return <ExaminationForm onExaminationSubmit={() => this.setState({ showFormReview: true })}/>;
    }

    render() {
        return (
            <div>
                {
                    this.renderContent()
                }
            </div>
        );
    }
}


export default reduxForm(
    {
        form: 'examinationForm'
    }
)(ExaminationNew);
