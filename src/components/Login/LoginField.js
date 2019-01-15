import React, {Component} from 'react';


export default ({input, label, type, meta : { error, touched }}) => {
    return (
        <div>
            <input type={type} placeholder={label} className="login-field" autoComplete="off" {...input}/>
            <div className="red-text">
                { touched && error }
            </div>
        </div>
    );
}


