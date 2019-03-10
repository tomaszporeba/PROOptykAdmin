import React from 'react';
import {NavLink} from 'react-router-dom';
import './sideMenu.css';


const MenuItem = ({title, icon, isOpen, path, toggleSidebar}) => {
    return (
            <li onClick={() => toggleSidebar()}>
                <NavLink to={path} activeClassName="selected">
                <i className="medium material-icons">{icon}</i>
                <span>{title}</span>
                </NavLink>
            </li>
    );
};

export default MenuItem;