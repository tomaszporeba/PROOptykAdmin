import React from 'react';
import './dashboard.css'


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {sidebarOpen: false};
    }

    handleViewSidebar = () => {
        this.setState({sidebarOpen: !this.state.sidebarOpen})
    };

    render() {
        return (
            null
        );
    }
}

export default Dashboard;