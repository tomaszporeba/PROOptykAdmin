import React from 'react';
import {NavLink} from 'react-router-dom';
import './sideMenu.css';


const MenuItem = ({title, icon, isOpen, path, toggleSidebar}) => {
    let spanClass = isOpen ? 'span-opened' : 'span-closed';
    return (
            <li onClick={() => {if(window.innerWidth< 600) toggleSidebar()}}>
                <NavLink  to={path} style={{width:"100%"}} activeClassName="selected">
                <i className="medium material-icons">{icon}</i>
                    <span>{title}</span>
                </NavLink>
            </li>
    );
};

export default MenuItem;