import * as React from 'react';

import Login from 'auth/Login';

const initialState = {
    email: '',
    password: ''
};

interface Props {}

type State = Readonly<typeof initialState>;

class Login extends React.Component<Props, State> {
    public readonly state: State = initialState;

    handleChange = event => this.setState();

    public render() {
        return <Login
            email={this.state.email}
            password={this.state.password}
        />;
    };
};

export default Login;
