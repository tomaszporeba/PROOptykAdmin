import React, {Component} from 'react';


export default ({input, type, label, meta : { error, touched }}) => {
    return (
        <div>
            <label>{label}</label>
            <input type={type} {...input}/>
            <div className="red-text">
                { touched && error }
            </div>
        </div>
    );
}


