import React, {Component} from 'react';
import _ from 'lodash';
import {reduxForm, Field} from 'redux-form';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import LoginField from './LoginField';
import loginFields from './loginFields';
import {fetchUser} from "../../actions";

class LoginForm extends Component {

    submitLogin = (values) => {
        // console.log(values);
        this.props.fetchUser(values, this.props.history)
    };

    renderFields() {
        return _.map(loginFields, ({label, name, type}) => {
            return <Field
                key={name}
                component={LoginField}
                type={type}
                label={label}
                name={name}/>
        })
    }

    render() {
        return (
            <div className="login-form-wrapper">
                <hr/>
                <form className="form-padding">
                    {this.renderFields()}
                </form>
                <div className="round-button" onClick={this.props.handleSubmit(this.submitLogin)}/>
            </div>
        );
    }
}



function mapStateToProps(state) {
    return {
        // formValues: state.form.loginForm.values
    };

}

LoginForm = connect(mapStateToProps, {fetchUser})(withRouter(LoginForm));


export default reduxForm({
    form: 'loginForm',
    destroyOnUnmount: false
})(withRouter(LoginForm));

// export default connect(mapStateToProps, {fetchUser})(withRouter(LoginForm));
