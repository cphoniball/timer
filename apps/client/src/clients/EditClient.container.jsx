import React, { Component } from 'react';
import { connect } from 'react-redux';

import EditClient from 'clients/EditClient';

import { actions as clientActions } from 'clients/clients.redux';

const mapStateToProps = ({ clients }, { match }) => ({
    client: console.log(match) || clients.data.find(client => client.id == match.params.client_id)
});

const mapDispatchToProps = dispatch => ({
    onSubmit: client => dispatch(clientActions.update(client))
});

// TODO: Create a generic loading component from this
const EditClientContainer = props => {
    if (!props.client) return null;

    return <EditClient key={props.match.params.client_id} {...props} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(EditClientContainer);
