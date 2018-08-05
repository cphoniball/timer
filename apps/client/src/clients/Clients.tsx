import * as React from 'react';
import styled from 'styles/components';

import * as FontAwesome from 'react-fontawesome';

import CreateClient, { Props as CreateClientProps } from './CreateClient';

import Client from './client.interface';

interface Props {
    clients: Client[];
    isFetching: boolean;
    onCreateClient(client: Client): void;
}

const CreateClientContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
`;

const StyledCreateClient = styled<CreateClientProps>(CreateClient)`
    float: right;
`;

const ClientList = styled.ul`
    display: block;
    width: 100%;
    list-style: none;
`;

const ClientListItem = styled.li`
    width: 100%;
    font-size: ${props => props.theme.font.base.size};
    margin-bottom: 15px;
    padding: 10px 12px;
    background-color: ${props => props.theme.color.white};
    box-shadow: 0px 1px 2px ${props => props.theme.color.main}88;
`;

const Clients: React.StatelessComponent<Props> = ({ clients, isFetching, onCreateClient }) => {
    if (!clients) return null;

    return (
        <div>
            <CreateClientContainer>
                <CreateClient onSubmit={onCreateClient} />
            </CreateClientContainer>
            {!clients.length && <span>You haven't created any clients yet.</span>}
            {!!clients.length && <ClientList>
                {clients.map(client => {
                    return (
                        <ClientListItem className="client" key={`client-${client.id}`}>{client.name}<FontAwesome name="trash-alt" /></ClientListItem>
                    );
                })}
            </ClientList>}
        </div>
    );
};

export default Clients;
