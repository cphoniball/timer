import * as React from 'react';

import Button from 'global/form/Button';
import Form from 'global/form/Form';
import Input from 'global/form/Input';

import Client from './client.interface';

export interface Props {
    className?: string;
    onSubmit(client: Client): void;
}

export interface State {
    client: Client;
}

const initialState: State = {
    client: {
        name: ''
    }
};

/**
 * Simple form to allow the user to create a client
 * @param props
 */
export default class CreateClient extends React.Component<Props, State> {
    public state = initialState;

    public render() {
        return (
            <Form onSubmit={this.handleSubmit} className={this.props.className}>
                <Input onChange={this.handleNameChange} value={this.state.client.name} placeholder="Client name" />
                <Button type="submit" disabled={!this.state.client.name.length}>Create Client</Button>
            </Form>
        );
    }

    private handleNameChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({ client: { ...this.state.client, name: event.currentTarget.value } });
    }

    private handleSubmit = () => {
        // TODO: Probably want to await on the result here before clearing out
        this.props.onSubmit(this.state.client);
        this.setState(initialState);
    }
}
