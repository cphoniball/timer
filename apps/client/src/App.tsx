import React = require('react');
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { Route, Router } from 'react-router-dom';

import history from 'global/routing/history.provider';

import Layout from 'application/Layout';
import Timer from 'timer/Timer.container';

import 'styles';

render(
    <Router history={history}>
        <Layout>
            <Route path="/" component={Timer} />
        </Layout>
    </Router>,
    document.getElementById('app')
);
