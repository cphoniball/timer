import React, { Component } from 'react';

import Modal from 'global/modal/Modal';

import Form from 'global/form/Form';
import Input from 'global/form/Input';

export default class EditClient extends Component {
    static propTypes = {
        client: PropTypes.object,
        onSubmit: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = { client: props.client };
    }

    render() {
        return (
            <Modal>
                <Form onSubmit={this.handleSubmit}>
                    <Input value={this.props.client.name} onChange={this.handleNameChange} />
                </Form>
            </Modal>
        );
    }

    handleNameChange(event) {
        this.setState({ client: { ...this.state.client, name: event.currentTarget.value } });
    }

    handleSubmit() {
        this.props.onSubmit(this.state.client);
    }
}
