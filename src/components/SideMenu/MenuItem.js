import React from 'react';


const MenuItem = ({title, icon}) => {
    return (
        <div className="menu-item">
            <i className="medium material-icons">{icon}</i>
           <span>{title}</span>
        </div>
    );
};

export default MenuItem;