import React from 'react';
import './dashboard.css'
import SideMenu from '../SideMenu/SideMenu'
import Header from '../Header/Header';


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { sidebarOpen: false };
    }

    handleViewSidebar = () => {
        this.setState({sidebarOpen: !this.state.sidebarOpen})
    };

    render() {
        return (
            <div>
                <SideMenu isOpen={this.state.sidebarOpen} toggleSidebar={this.handleViewSidebar}/>
                <Header/>
            </div>
        );
    }
}

export default Dashboard;