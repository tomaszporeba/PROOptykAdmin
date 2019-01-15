import React from 'react';
import {Link, NavLink} from 'react-router-dom';


const MenuItem = ({title, icon, isOpen, path}) => {
    return (
        <NavLink to={path} >
            <div className="menu-item">
                <i className="medium material-icons">{icon}</i>
                {isOpen ? <span>{title}</span> : ''}
            </div>
        </NavLink>
    );
};

export default MenuItem;