import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './actions'
import './App.css';
import Dashboard from "./components/Dashboard/Dashboard";
import EyeglassList from "./components/Eyeglasses/EyeglassList";
import PrivateRoute from "./PrivateRoute";
import Login from "./components/Login/Login";
import './components/Dashboard/dashboard.css'
import SideMenu from './components/SideMenu/SideMenu'
import Header from './components/Header/Header';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {sidebarOpen: false};
    }

    handleViewSidebar = () => {
        this.setState({sidebarOpen: !this.state.sidebarOpen})
    };

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={Dashboard}/>
                    <Route exact path="/login" component={Login}/>
                    <div className="dashboard-container">
                        <div className="dashboard">
                            <Header toggleSidebar={this.handleViewSidebar}/>
                            <div className="main-container">
                                <SideMenu isOpen={this.state.sidebarOpen} />
                                <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                                <PrivateRoute exact path="/eyeglass" component={EyeglassList}/>
                            </div>
                        </div>
                    </div>

                </div>
            </BrowserRouter>
        );
    }
}

export default connect(null, actions)(App);
