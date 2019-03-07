import React, { Component } from 'react';
import InvoiceReview from './InvoiceReview';
import InvoiceForm from './InvoiceForm';
import { reduxForm } from 'redux-form';


class InvoiceNew extends Component{
    state = { showFormReview: false };

    renderContent() {
        if (this.state.showFormReview) {
            return <InvoiceReview onCancel={() => this.setState({ showFormReview: false })}/>;
        }

        return <InvoiceForm onInvoiceSubmit={() => this.setState({ showFormReview: true })}/>;
    }

    render() {
        return (
            <div className="form-content">
                {this.renderContent()}
            </div>
        );
    }
}

export default InvoiceNew;