import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'global/form/Button';
import Form from 'global/form/Form';
import Input from 'global/form/Input';

const initialState = {
    client: {
        name: ''
    }
};

/**
 * Simple form to allow the user to create a client
 * @param props
 */
export default class CreateClient extends Component {
    static propTypes = {
        className: PropTypes.string,
        onSubmit: PropTypes.func
    };

    state = initialState;

    render() {
        return (
            <Form onSubmit={this.handleSubmit} className={this.props.className}>
                <Input onChange={this.handleNameChange} value={this.state.client.name} placeholder="Client name" />
                <Button type="submit" disabled={!this.state.client.name.length}>Create Client</Button>
            </Form>
        );
    }

    handleNameChange = event => {
        this.setState({ client: { ...this.state.client, name: event.currentTarget.value } });
    }

    handleSubmit = () => {
        // TODO: Probably want to await on the result here before clearing out
        this.props.onSubmit(this.state.client);
        this.setState(initialState);
    }
}
