import * as React from 'react';

import Modal from 'global/modal/Modal';

import Client from 'clients/client.interface';

import Button from 'global/form/Button';
import Form from 'global/form/Form';
import Input from 'global/form/Input';

export interface Props {
    client: Client;
    onSubmit(client: Client): void;
}

export interface State {
    client: Client;
}

export default class EditClient extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = { client: props.client };
    }

    public render() {
        return (
            <Modal>
                <Form onSubmit={this.handleSubmit}>
                    <Input value={this.props.client.name} onChange={this.handleNameChange} />
                </Form>
            </Modal>
        );
    }

    private handleNameChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({ client: { ...this.state.client, name: event.currentTarget.value } });
    }

    private handleSubmit() {
        this.props.onSubmit(this.state.client);
    }
}
