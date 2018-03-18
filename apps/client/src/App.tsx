import React = require('react');
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { Route, Router } from 'react-router-dom';

import history from 'global/routing/history.provider';

import Timer from 'timer/Timer.container';

render(
    <Router history={history}>
        <Route path="/" component={Timer} />
    </Router>,
    document.getElementById('app')
);
