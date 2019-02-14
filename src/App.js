import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './actions'
import './App.css';
import Dashboard from "./components/Dashboard/Dashboard";
import List from "./components/Eyeglasses/List";
import ClientReview from "./components/Client/ClientReview";
import PrivateRoute from "./PrivateRoute";
import Login from "./components/Login/Login";
import './components/Dashboard/dashboard.css'
import SideMenu from './components/SideMenu/SideMenu'
import Header from './components/Header/Header';
import {getEyeglasses, getInvoices, getExaminations, getClients} from "./actions";

const eyeglassColumns =
    [{title: "Holder name", width: 2, sortKeyValue: "holder_name"},
        {title: "Purchase price", width: 2, sortKeyValue: "purchase_price"},
        {title: "Price", width: 2, sortKeyValue: "price"},
        {title: "Vat", width: 2, sortKeyValue: "vat"},
        {title: "Availability", width: 2, sortKeyValue: "availability"},
        {title: "Color", width: 2, sortKeyValue: "color"},
        {title: "Size", width: 2, sortKeyValue: "size"},
        {title: "Salon", width: 2, sortKeyValue: "salon"}]
;

const invoiceColumns = [{title: "Number", width: 2, sortKeyValue: "number"},
    {title: "Amount", width: 2, sortKeyValue: "amount"},
    {title: "Company", width: 2, sortKeyValue: "company"},
    {title: "Product", width: 2, sortKeyValue: "product"},
    {title: "Account Number", width: 2, sortKeyValue: "accountNumber"},
    {title: "Client", width: 2, sortKeyValue:"clientId"}]
;

const examinationColumns = [{title: "Scheduled date", width: 2, sortKeyValue: "scheduledDate"},
    {title: "Right eye", width: 2, sortKeyValue: "rightEye"},
    {title: "Left eye", width: 2, sortKeyValue: "leftEye"},
    {title: "Client", width:2, sortKeyValue:"client"}]
;

const clientColumns = [{title: "Name", width: 2, sortKeyValue: "name"},
    {title: "Last name", width: 2, sortKeyValue: "lastName"},
    {title: "Phone number", width: 2, sortKeyValue: "phoneNumber"}]
;

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
                <div className="App">
                    <Route exact path="/" component={Dashboard}/>
                    <Route exact path="/login" component={Login}/>
                    <div className="dashboard-container">
                        <div className="dashboard">
                            <Header toggleSidebar={this.handleViewSidebar}/>
                            <div className="main-container">
                                <SideMenu isOpen={this.state.sidebarOpen}/>
                                <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                                <PrivateRoute exact path="/eyeglass" columns={eyeglassColumns} requestType={this.props.getEyeglasses}
                                              component={List}/>
                                <PrivateRoute exact path="/invoice" columns={invoiceColumns} requestType={this.props.getInvoices}
                                              component={List}/>
                                <PrivateRoute exact path="/examination" columns={examinationColumns} requestType={this.props.getExaminations}
                                              component={List}/>
                                <PrivateRoute exact path="/client" columns={clientColumns} requestType={this.props.getClients}
                                              component={List}/>
                                <PrivateRoute exact path="/client/review" component={ClientReview}/>
                            </div>
                        </div>
                    </div>

                </div>
            </BrowserRouter>
        );
    }
}


export default connect(null, {getEyeglasses, getInvoices, getExaminations, getClients})(App);
