import * as React from 'react';

import CreateClient from 'clients/CreateClient';

import Client from 'clients/client.interface';

interface Props {
    clients: Client[];
    isFetching: boolean;
    onCreateClient(client: Client): void;
}

const Clients: React.StatelessComponent<Props> = ({ clients, isFetching, onCreateClient }) => {
    if (!clients) return null;

    return (
        <div>
            <CreateClient onSubmit={onCreateClient} />
            {!clients.length && <span>You haven't created any clients yet.</span>}
            {!!clients.length && <ul>
                {clients.map(client => {
                    return (
                        <li className="client" key={`client-${client.id}`}>{client.name}</li>
                    );
                })}
            </ul>}
        </div>
    );
};

export default Clients;
