import * as React from 'react';

import { Redirect, Route, RouteProps } from 'react-router-dom';

const AuthRoute: React.StatelessComponent<RouteProps> = ({ component: Component, ...rest }) => {
    const render = (props: any) => {
        return localStorage.getItem('access_token')
            ? <Component {...props} />
            : <Redirect to="/" />;
    };

    return <Route {...rest} render={render} />;
};

export default AuthRoute;
