import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Clients from './Clients';

import { actions as clientActions } from 'clients/clients.redux';

const mapStateToProps = ({ clients }) => ({
    clients: clients.data,
    isFetching: clients.isFetching
});

const mapDispatchToProps = dispatch => ({
    getAll: () => dispatch(clientActions.getAll()),
    onCreateClient: client => dispatch(clientActions.create(client)),
    onUpdateClient: client => dispatch(clientActions.update(client)),
    onDeleteClient: id => dispatch(clientActions.delete(id)),
});

class ClientsContainer extends Component {
    componentDidMount = () => this.props.getAll();

    render = () => <Clients {...this.props} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientsContainer);
