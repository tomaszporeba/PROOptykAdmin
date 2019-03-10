import React from 'react';
import './sideMenu.css'
import MenuItem from './MenuItem';


const MENU_FIELDS = [
    {title: "Dashboard", icon: "home", path: "/"},
    {title: "Eyeglasses", icon: "remove_red_eye", path: "/eyeglass"},
    {title: "Invoices", icon: "list_alt", path: "/invoice" },
    {title: "Clients", icon: "people", path: "/client"},
    {title: "Examinations", icon: "insert_invitation", path: "/examination"}
];

const SideMenu = ({isOpen, toggleSidebar}) => {

    let sidebarClass = isOpen ? 'sidebar-open side-menu-container' : 'sidebar-closed side-menu-container';
    return (
        <nav className={sidebarClass}>
            <ul>
            {MENU_FIELDS.map(field => (
                <MenuItem toggleSidebar={toggleSidebar} key={field.title} isOpen={isOpen} title={field.title} icon={field.icon} path={field.path}/>
                )
            )}
            </ul>
        </nav>
    );
};

export default SideMenu;