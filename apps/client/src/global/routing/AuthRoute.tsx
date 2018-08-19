import * as React from 'react';

import { Redirect, Route, RouteProps } from 'react-router-dom';

// TODO: This is a crappy naive implementation that needs to be improved
const AuthRoute: React.StatelessComponent<RouteProps> = ({ component: Component, ...rest }) => {
    if (!localStorage.getItem('access_token')) return <Redirect to="/" />;

    const render = (props: any) => {
        if (rest.render) return rest.render;

        return <Component {...props} />;
    };

    return <Route {...rest} render={render} />;
}

export default AuthRoute;
