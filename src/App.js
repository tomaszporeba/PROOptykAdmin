import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';
import Dashboard from "./components/Dashboard/Dashboard";
import List from "./components/List/List";
import PrivateRoute from "./PrivateRoute";
import Login from "./components/Login/Login";
import './components/Dashboard/dashboard.css'
import SideMenu from './components/utils/SideMenu/SideMenu'
import Header from './components/Header/Header';
import EyeglassNew from "./components/Eyeglasses/EyeglassNew";
import ClientNew from "./components/Clients/ClientNew";
import InvoiceNew from "./components/Invoices/InvoiceNew";
import ExaminationNew from "./components/Examination/ExaminationNew";
import * as headers from "./consts/headers"


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {sidebarOpen: false, sidebarA: true};
    }

    handleViewSidebar = () => {
        this.setState({sidebarOpen: !this.state.sidebarOpen})
    };

    render() {
        const { getEyeglasses } = this.props;
        return (
            <BrowserRouter>
                <div className="App">
                    <Route exact path="/" component={Dashboard}/>
                    <Route exact path="/login" component={Login}/>
                    <div className="dashboard-container">
                        <div className="dashboard">
                            <Header toggleSidebar={this.handleViewSidebar}/>
                            <div className="main-container">
                                <SideMenu isOpen={this.state.sidebarOpen}/>
                                <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                                <PrivateRoute exact path="/eyeglass" columns={headers.eyeglassColumns}
                                              component={List}/>
                                {/*<PrivateRoute exact path="/invoice" columns={headers.invoiceColumns}*/}
                                              {/*component={List}/>*/}
                                {/*<PrivateRoute exact path="/examination" columns={headers.examinationColumns}*/}
                                              {/*component={List}/>*/}
                                {/*<PrivateRoute exact path="/client" columns={headers.clientColumns}*/}
                                              {/*component={List}/>*/}
                                <PrivateRoute exact path="/eyeglass/edit/:id" component={EyeglassNew}/>
                                <PrivateRoute exact path="/eyeglass/new" component={EyeglassNew}/>
                                <PrivateRoute exact path="/invoice/edit/:id" component={InvoiceNew}/>
                                <PrivateRoute exact path="/invoice/new" component={InvoiceNew}/>
                                <PrivateRoute exact path="/client/edit/:id" component={ClientNew}/>
                                <PrivateRoute exact path="/client/new" component={ClientNew}/>
                                <PrivateRoute exact path="/examination/edit/:id" component={ExaminationNew}/>
                                <PrivateRoute exact path="/examination/new" component={ExaminationNew}/>
                            </div>
                        </div>
                    </div>

                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => {
    return {isSidebarOpen: state.isSidebarOpen}
};

export default connect(mapStateToProps, null)(App);
