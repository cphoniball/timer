import * as React from 'react';

import clientApi from 'clients/client.api';
import Client from 'clients/client.interface';

interface State {
    isFetching: boolean;
    clients: [Client];
}

class Clients extends React.Component<object, State> {
    public readonly state: State = {
        clients: null,
        isFetching: false
    };

    public async componentDidMount() {
        this.setState({ isFetching: true });

        const clients = await clientApi.find();

        this.setState({ clients, isFetching: false });
    }

    public render() {
        if (!this.state.clients || this.state.isFetching) return 'Loading client information...';

        return (
            <div>
                <ul>
                    {this.state.clients.map(client => {
                        return (
                            <li className="client" key={`client-${client.id}`}>{client.name}</li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default Clients;
