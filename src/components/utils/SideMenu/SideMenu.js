import React from 'react';
import './sideMenu.css'
import MenuItem from './MenuItem';
import {NavLink} from "react-router-dom";


const MENU_FIELDS = [
    {title: "Eyeglasses", icon: "remove_red_eye", path: "/eyeglass"},
    {title: "Invoices", icon: "list_alt", path: "/invoice" },
    {title: "Clients", icon: "people", path: "/client"},
    {title: "Examinations", icon: "insert_invitation", path: "/examination"}
];

const SideMenu = ({isOpen, toggleSidebar}) => {

    let sidebarClass = isOpen ? 'sidebar-open side-menu-container' : 'sidebar-closed side-menu-container';
    let ulClass = isOpen ? 'ul-open' : 'ul-close';
    return (
        <nav className={sidebarClass}>
            <ul className={ulClass}>
                <li onClick={() => {if(window.innerWidth< 600) toggleSidebar()}}>
                    <NavLink className={ulClass} exact to={"/"} activeClassName="selected">
                        <i className="medium material-icons">{"home"}</i>
                        <span>{"Dashboard"}</span>
                    </NavLink>
                </li>
            {MENU_FIELDS.map(field => (
                <MenuItem toggleSidebar={toggleSidebar} key={field.title} isOpen={isOpen} title={field.title} icon={field.icon} path={field.path}/>
                )
            )}
            </ul>
        </nav>
    );
};

export default SideMenu;