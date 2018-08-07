import * as React from 'react';

import Client from './client.interface';
import Clients from './Clients';

import clientApi from './client.api';
import { appendFileSync } from 'fs';

export interface Props {}

export interface State {
    isFetching: boolean;
    clients: Client[];
}

export default class ClientsContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            clients: null,
            isFetching: false
        };
    }

    public async componentDidMount() {
        this.setState({ isFetching: true });

        const clients = await clientApi.find();

        this.setState({ clients, isFetching: false });
    }

    public render() {
        return (
            <Clients
                isFetching={this.state.isFetching}
                clients={this.state.clients}
                onCreateClient={this.createClient}
                onDeleteClient={this.deleteClient}
            />
        );
    }

    private createClient = async (client: Client) => {
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

    private deleteClient = async (id: number) => {
        this.setState({ isFetching: true });

        try {
            await clientApi.delete(id);

            this.setState({ clients: this.state.clients.filter(client => client.id !== id) });
        } catch (error) {
            console.log('Received error when deleting client!');
            console.log(error);
        }

        this.setState({ isFetching: false });
    };
}
