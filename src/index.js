import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import 'materialize-css/dist/css/materialize.min.css';
import reducers from './reducers';
import requestMiddleware from "./middlewares/requestMiddleware";

const startState = {
    auth: localStorage.getItem('TOKEN')
};

const logAction = store => {
    return next => {
        return action => {
            const result = next(action);
            console.log(`Middleware ${JSON.stringify(result)}`);
            return result;
        }
    }
};

const store = createStore(reducers, startState, applyMiddleware(reduxThunk, logAction));


ReactDOM.render(
    <Provider store={store}><App/></Provider>,
    document.getElementById('root'));
serviceWorker.unregister();
