import React from 'react';
import {NavLink} from 'react-router-dom';


const MenuItem = ({title, icon, isOpen, path}) => {
    return (
            <li>
                <NavLink to={path} >
                <i className="medium material-icons">{icon}</i>
                <span>{title}</span>
                </NavLink>
            </li>
    );
};

export default MenuItem;