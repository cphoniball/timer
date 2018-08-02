import * as React from 'react';

import Client from 'clients/client.interface';
import Clients from 'clients/Clients';

import clientApi from 'clients/client.api';

export interface Props {}

export interface State {
    isFetching: boolean;
    clients: [Client];
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
        return <Clients isFetching={this.state.isFetching} clients={this.state.clients} />;
    }
}
