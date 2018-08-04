import * as React from 'react';
import styled from 'styles/components';

import CreateClient, { Props as CreateClientProps } from './CreateClient';

import Client from './client.interface';

interface Props {
    clients: Client[];
    isFetching: boolean;
    onCreateClient(client: Client): void;
}

const StyledCreateClient = styled<CreateClientProps>(CreateClient)`
    float: right;
`;

const Clients: React.StatelessComponent<Props> = ({ clients, isFetching, onCreateClient }) => {
    if (!clients) return null;

    return (
        <div>
            <StyledCreateClient onSubmit={onCreateClient} />
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
