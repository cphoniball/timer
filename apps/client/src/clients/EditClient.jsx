import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Modal from 'global/modal/Modal';

import Button from 'global/form/Button';
import Form from 'global/form/Form';
import Input from 'global/form/Input';

import history from 'global/routing/history.provider';

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

    handleSubmit = async () => {
        await this.props.onSubmit(this.state.client);
        history.push("/clients");
    }

    render() {
        return (
            <Modal>
                <Form onSubmit={this.handleSubmit}>
                    <Input value={this.state.client.name} onChange={this.handleNameChange} />
                    <Button type="submit">Update Client</Button>
                    <Link to="/clients"><Button type="submit">Cancel</Button></Link>
                </Form>
            </Modal>
        );
    }
}
