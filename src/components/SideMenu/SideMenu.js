import React from 'react';
import { Link } from 'react-router-dom';
import './sideMenu.css'
import MenuItem from './MenuItem';

const MENU_FIELDS = [
    {title: "Eyeglasses", icon: "add"},
    {title: "Invoices", icon: "add"},
    {title: "Clients", icon: "add"},
    {title: "Examinations", icon: "add"}
];

const SideMenu = ({isOpen, toggleSidebar}) => {
    let sidebarClass = isOpen ? 'sidebar-open side-menu-container' : 'sidebar-closed side-menu-container';
    return (
        <nav className={sidebarClass}>
            <button onClick={toggleSidebar}>button</button>
            <div className="top-image">

            </div>
            {MENU_FIELDS.map(field => (
                <MenuItem title={field.title} icon={field.icon}/>
                )
            )}
        </nav>
    );
};

export default SideMenu;