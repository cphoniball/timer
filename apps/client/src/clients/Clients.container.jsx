import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Clients from './Clients';

import clientApi from './client.api';

export default class ClientsContainer extends Component {
    static propTypes = {
        match: PropTypes.object
    };

    state = {
        client: null,
        isFetching: false
    };

    async componentDidMount() {
        this.setState({ isFetching: true });

        const clients = await clientApi.find();

        this.setState({ clients, isFetching: false });
    }

    render() {
        return (
            <Clients
                isFetching={this.state.isFetching}
                clients={this.state.clients}
                onCreateClient={this.createClient}
                onDeleteClient={this.deleteClient}
                match={this.props.match}
            />
        );
    }

    createClient = async client => {
        this.setState({ isFetching: true });

        try {
            const createdClient = await clientApi.create(client);

            this.setState({ clients: [...this.state.clients, createdClient] });
        } catch (error) {
            console.log('Received error when creating client!');
            console.log(error);
        }

        this.setState({ isFetching: false });
    }

    deleteClient = async id => {
        this.setState({ isFetching: true });

        try {
            await clientApi.delete(id);

            this.setState({ clients: this.state.clients.filter(client => client.id !== id) });
        } catch (error) {
            console.log('Received error when deleting client!');
            console.log(error);
        }

        this.setState({ isFetching: false });
    }
}
