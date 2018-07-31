import React = require('react');
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { Route, Router } from 'react-router-dom';

import history from 'global/routing/history.provider';

import Layout from 'application/Layout';
import Login from 'auth/Login.container';
import Clients from 'clients/Clients';
import AuthRoute from 'global/routing/AuthRoute';
import Sidebar from 'navigation/Sidebar';
import Timer from 'timer/Timer.container';

import 'styles';

render(
    <Router history={history}>
        <Layout>
            <Route path="/" exact component={Login} />
            <AuthRoute path="/" component={Sidebar} />
            <AuthRoute path="/timer" exact component={Timer} />
            <AuthRoute path="/clients" exact component={Clients} />
        </Layout>
    </Router>,
    document.getElementById('app')
);
