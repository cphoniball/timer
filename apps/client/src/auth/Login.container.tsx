import * as React from 'react';

import Login from 'auth/Login';

import authApi from 'auth/auth.api';

import { Credentials } from 'auth/credentials.interface';

import history from 'global/routing/history.provider';

interface State {
    credentials: Credentials;
    error: string;
}

const initialState: State = {
    credentials: {
        email: '',
        password: ''
    },
    error: null
};

interface Props {}

class LoginContainer extends React.Component<Props, State> {
    public readonly state: State = initialState;

    public handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({ credentials: { ...this.state.credentials, [event.currentTarget.name]: event.currentTarget.value } });
    }

    public handleSubmit = async () => {
        try {
            const response = await authApi.token(this.state.credentials);
            localStorage.setItem('access_token', response.token);
            history.push('/timer');
        } catch (error) {
            this.setState({ error: 'Invalid username or password.' });
        }
    }

    public render() {
        return (
            <Login
                email={this.state.credentials.email}
                password={this.state.credentials.password}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                error={this.state.error}
            />
        );
    }
}

export default LoginContainer;
