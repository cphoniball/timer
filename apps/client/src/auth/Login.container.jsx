import React, { Component } from 'react';

import Login from 'auth/Login';

import authApi from 'auth/auth.api';

import history from 'global/routing/history.provider';

class LoginContainer extends Component {
    state = {
        credentials: {
            email: '',
            password: ''
        },
        error: null
    };

    handleChange = event => {
        this.setState({ credentials: { ...this.state.credentials, [event.currentTarget.name]: event.currentTarget.value } });
    };

    handleSubmit = async () => {
        try {
            const response = await authApi.token(this.state.credentials);
            localStorage.setItem('access_token', response.token);
            history.push('/timer');
        } catch (error) {
            this.setState({ error: 'Invalid username or password.' });
        }
    };

    render() {
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
