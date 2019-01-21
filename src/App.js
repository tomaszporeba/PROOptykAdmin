import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './actions'
import './App.css';
import Dashboard from "./components/Dashboard/Dashboard";
import EyeglassList from "./components/Eyeglasses/EyeglassList";
import PrivateRoute from "./PrivateRoute";
import Login from "./components/Login/Login";

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={Dashboard}/>
                    <Route exact path="/login" component={Login}/>
                    <PrivateRoute path="/dashboard/" component={Dashboard}/>
                    <PrivateRoute exact path="/dashboard/eyeglass" component={EyeglassList}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default connect(null, actions)(App);
