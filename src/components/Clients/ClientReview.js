import React , {Component} from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import {saveClient} from "../../actions";

class ClientReview extends Component {

    handleSubmit = async () => {
        await this.props.saveClient(this.props.formValues);
        if (this.props.isModal) {
            this.props.handleModalSubmit()

        } else {
            this.props.history.push("/client")
        }

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
                <button onClick={() => this.handleSubmit()} className="black btn-flat right white-text">Save</button>
            </div>
        );
    }

};

function mapStateToProps(state) {
    return {
        formValues: state.form.clientForm.values
    };

}

export default connect(mapStateToProps, {saveClient})(withRouter(ClientReview));