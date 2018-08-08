import * as React from 'react';
import styled from 'styles/components';

import { match as Match } from 'react-router';
import { Link } from 'react-router-dom';

import AuthRoute from 'global/routing/AuthRoute';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CreateClient, { Props as CreateClientProps } from './CreateClient';
import EditClient from './EditClient';

import Client from './client.interface';

interface Props {
    clients: Client[];
    isFetching: boolean;
    match: Match<{}>;
    onCreateClient(client: Client): void;
    onDeleteClient(id: number): void;
}

const CreateClientContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
`;

const ClientList = styled.ul`
    display: block;
    width: 100%;
    list-style: none;
    margin-top: 30px;
`;

const ClientListItem = styled.li`
    width: 100%;
    font-size: ${props => props.theme.font.base.size};
    margin-bottom: 15px;
    padding: 10px 12px;
    background-color: ${props => props.theme.color.white};
    box-shadow: 0px 1px 2px ${props => props.theme.color.main}88;
`;

const Clients: React.StatelessComponent<Props> = ({ clients, isFetching, onCreateClient, onDeleteClient, match }) => {
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
                        <ClientListItem className="client" key={`client-${client.id}`}>
                            {client.name}
                            <span className="float-right">
                                <Link to={`${match.url}/${client.id}`}><FontAwesomeIcon className="mr-3" icon="pencil-alt" /></Link>
                                <span onClick={() => onDeleteClient(client.id)}><FontAwesomeIcon icon="trash-alt" /></span>
                            </span>
                        </ClientListItem>
                    );
                })}
            </ClientList>}
            <AuthRoute path={`${match.url}/:client_id`} component={EditClient} />
        </div>
    );
};

export default Clients;
