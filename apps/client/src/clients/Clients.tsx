import * as React from 'react';

import Client from 'clients/client.interface';

interface Props {
    clients: [Client];
    isFetching: boolean;
}

const Clients: React.StatelessComponent<Props> = ({ clients, isFetching }) => {
    if (!clients || isFetching) return <span>'Loading client information...'</span>;

    if (!clients.length) return <span>You haven't created any clients yet.</span>;

    return (
        <div>
            <ul>
                {clients.map(client => {
                    return (
                        <li className="client" key={`client-${client.id}`}>{client.name}</li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Clients;
