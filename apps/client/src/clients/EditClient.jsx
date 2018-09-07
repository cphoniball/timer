import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from 'global/modal/Modal';

import Button from 'global/form/Button';
import Form from 'global/form/Form';
import Input from 'global/form/Input';

// TODO: Make sure that we update the local state when a new client is selected
// TODO: Allow user to close the modal
// TODO: Send user back to main clients page after they have submitted the form successfully
export default class EditClient extends Component {
    static propTypes = {
        client: PropTypes.object,
        onSubmit: PropTypes.func
    };

    state = {
        client: this.props.client
    };

    handleNameChange = (event) => {
        this.setState({ client: { ...this.state.client, name: event.currentTarget.value } });
    };

    handleSubmit = () => this.props.onSubmit(this.state.client);

    render() {
        return (
            <Modal>
                <Form onSubmit={this.handleSubmit}>
                    <Input value={this.state.client.name} onChange={this.handleNameChange} />
                    <Button type="submit">Update Client</Button>
                </Form>
            </Modal>
        );
    }
}
