import React from 'react';
import './header.css';


export default () => {
    const user = JSON.parse(localStorage.getItem('USER'));
    return (
        <div className="header-container">
            <span>{user.firstName + " " + user.lastName}</span>
        </div>
    );
}


