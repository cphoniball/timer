import React, { Component } from 'react';

import { Redirect, Route } from 'react-router-dom';

// TODO: This is a crappy naive implementation that needs to be improved
const AuthRoute = ({ component, ...rest }) => {
    if (!localStorage.getItem('access_token')) return <Redirect to="/" />;

    return <Route {...rest} component={component} />;
}

export default AuthRoute;
