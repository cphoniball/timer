import * as React from 'react';

import Login from 'auth/Login';

import authApi from 'auth/auth.api';

import { Credentials } from 'auth/credentials.interface';

const initialState = {
    credentials: {
        email: '',
        password: ''
    }
};

interface Props {}

type State = Readonly<{
    credentials: Credentials;
}>;

class LoginContainer extends React.Component<Props, State> {
    public readonly state: State = initialState;

    public handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({ credentials: { ...this.state.credentials, [event.currentTarget.name]: event.currentTarget.value } });
    }

    public handleSubmit = async () => {
        const response = await authApi.token(this.state.credentials);
        console.log(response);
    }

    public render() {
        return (
            <Login
                email={this.state.credentials.email}
                password={this.state.credentials.password}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
            />
        );
    }
}

export default LoginContainer;
