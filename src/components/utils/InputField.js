import React, {Component} from 'react';
import './inputField.css'


export default ({input, type, label, meta : { error, touched }}) => {
    return (
        <div className="input-container">
            <div className="form-group">
                <input {...input} type={type} required="required"/>
                <label htmlFor="input" className="control-label">{label}</label><i className="bar"></i>
            </div>
        </div>

    );
}


