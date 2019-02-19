import React, { Component } from 'react';
import ClientReview from './ClientReview';
import ClientForm from './ClientForm';
import { reduxForm } from 'redux-form';


class ClientNew extends Component{
    state = { showFormReview: false };

    renderContent() {
        if (this.state.showFormReview) {
            return <ClientReview onCancel={() => this.setState({ showFormReview: false })}/>;
        }

        return <ClientForm onClientSubmit={() => this.setState({ showFormReview: true })}/>;
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
        form: 'clientForm'
    }
)(ClientNew);