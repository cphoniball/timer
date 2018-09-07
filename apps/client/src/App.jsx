import React from 'react';
import { hot } from 'react-hot-loader';

import { Route, Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from 'redux/store';

import history from 'global/routing/history.provider';

import Layout from 'application/Layout';
import Login from 'auth/Login.container';
import Clients from 'clients/Clients.container';
import AuthRoute from 'global/routing/AuthRoute';
import Sidebar from 'navigation/Sidebar';
import Timer from 'timer/Timer.container';

import 'bootstrap/scss/bootstrap.scss';
import 'styles';

import createIconLibrary from 'styles/fontawesome';

createIconLibrary();

const App = () => (
    <Provider store={store}>
        <Router history={history}>
            <Layout>
                <Sidebar />
                <Route path="/" exact component={Login} />
                <AuthRoute path="/timer" exact component={Timer} />
                <AuthRoute path="/clients" component={Clients} />
            </Layout>
        </Router>
    </Provider>
);

// const App = () => <div>This is a test</div>;

// export default App;
export default hot(module)(App);
