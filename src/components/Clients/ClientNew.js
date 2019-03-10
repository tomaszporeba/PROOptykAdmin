import React, { Component } from 'react';
import ClientReview from './ClientReview';
import ClientForm from './ClientForm';
import { reduxForm } from 'redux-form';

class ClientNew extends Component{
    state = {
        showFormReview: false,
    };

    handleModal = () =>  {
        this.props.handleModalSubmit()
    };


    renderContent() {
        if (this.state.showFormReview) {
            return <ClientReview handleModalSubmit={() =>  this.handleModal()}  onCancel={() => this.setState({ showFormReview: false })}/>;
        }

        return <ClientForm onClientSubmit={() => this.setState({ showFormReview: true })}/>;
    }

    render() {
        return (
            <div className="form-content">
                {
                    this.renderContent()
                }
            </div>
        );
    }
}


export default reduxForm(
    {
        form: 'clientForm'
    }
)(ClientNew);
