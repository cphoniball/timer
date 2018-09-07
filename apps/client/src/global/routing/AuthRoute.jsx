import React, { Component } from 'react';

import { Redirect, Route } from 'react-router-dom';

// TODO: This is a crappy naive implementation that needs to be improved
const AuthRoute = props => {
    if (!localStorage.getItem('access_token')) return <Redirect to="/" />;

    return <Route {...props} />;
}

export default AuthRoute;
