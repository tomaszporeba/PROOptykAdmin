import React, { Component } from 'react';
import './login.css'
import LoginForm from './LoginForm'
import image from '../../images/white_logo.png'


class Login extends Component{


    render() {
        return(
            <div className="login-container">
                <div className="login-rec">
                    <div className="login-logo">
                        <img src={image}/>
                    </div>
                    <div className="login-form">
                        <LoginForm />
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;