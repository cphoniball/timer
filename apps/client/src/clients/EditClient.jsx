import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from 'global/modal/Modal';

import Form from 'global/form/Form';
import Input from 'global/form/Input';

export default class EditClient extends Component {
    static propTypes = {
        clients: PropTypes.object,
        onSubmit: PropTypes.func
    };

    state = {
        client: this.props.client
    };

    handleNameChange(event) {
        this.setState({ client: { ...this.state.client, name: event.currentTarget.value } });
    }

    handleSubmit() {
        this.props.onSubmit(this.state.client);
    }

    render() {
        return (
            <Modal>
                {console.log(this.props.clients)}
                {console.log(this.props.match)}
                <Form onSubmit={this.handleSubmit}>
                    <Input value={this.props.client.name} onChange={this.handleNameChange} />
                </Form>
            </Modal>
        );
    }
}
