import React from 'react';
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {

    const isLoggedIn = localStorage.getItem('TOKEN');

    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn ? (
                    <Component columns={rest.columns} requestType={rest.requestType}{...props} />
                ) : (
                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                )
            }
        />
    )
};

export default PrivateRoute