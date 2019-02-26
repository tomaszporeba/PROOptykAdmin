import React from 'react';
import './header.css';

export default ({toggleSidebar}) => {
    const user = JSON.parse(localStorage.getItem('USER'));
    return (
        <div className="header-container">
            <i onClick={toggleSidebar} className="small material-icons burger-icon">menu</i>

            <span>{`${user.firstName} ${user.lastName}`}</span>
        </div>
    );
}


