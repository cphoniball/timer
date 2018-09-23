import moment from 'moment';
import * as Phoenix from 'phoenix';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import Timer from 'timer/Timer';
import FinishedTimeEntries from 'timer/FinishedTimeEntries';

import timeEntryApi from './timer.api';

import { actions as timeEntryActions, selectors } from 'timer/time_entries.redux';

const initialTimeEntry = {
    description: '',
    ended_at: null,
    id: 'unsaved-time-entry',
    started_at: null,
    user: { id: 1, name: 'testuser', email: 'testing@test.com' }
};

class TimerContainer extends Component {
    oldReimplementComponentDidMount() {
        const socket = new Phoenix.Socket('ws://api.timer.test:4000/socket', {
            transport: WebSocket
        });
        socket.connect();

        // Join our channel and stop the timer if we receive that message
        const channel = socket.channel('time_entry:lobby', {});

        channel.on('start', payload => this.setState({ isRunning: true, timeEntry: payload }));

        channel.on('stop', () => this.setState({ isRunning: false, timeEntry: initialTimeEntry }));

        channel.join()
            .receive('ok', res => console.log(`Joined channel`, res))
            .receive('error', res => console.log(`Unable to join channel`, res));
    }

    componentDidMount = () => {
        // Load existing time entries into state
        this.props.getTimeEntries();
    };

    start = () => {
        this.props.start({
            ...this.props.activeTimeEntry,
            started_at: moment().toISOString()
        });
    }

    stop = () => this.props.stop(this.props.activeTimeEntry.id);

    handleDescriptionChange = description => {
        this.props.update({ ...this.props.activeTimeEntry, description });
    }

    render() {
        return (
            <div>
                <Timer
                    start={this.start}
                    stop={this.stop}
                    timeEntry={this.props.activeTimeEntry}
                    onDescriptionChange={this.handleDescriptionChange}
                />
                <FinishedTimeEntries timeEntries={this.props.timeEntries} />
            </div>
        );
    }
}

const mapStateToProps = ({ time_entries }) => ({
    timeEntries: selectors.finishedTimeEntries(time_entries.data),
    activeTimeEntry: selectors.getActiveTimeEntry(time_entries.data)
});

const mapDispatchToProps = dispatch => ({
    getTimeEntries: () => dispatch(timeEntryActions.getAll()),
    start: timeEntry => dispatch(timeEntryActions.start(timeEntry)),
    stop: id => dispatch(timeEntryActions.stop(id)),
    update: timeEntry => dispatch(timeEntryActions.update(timeEntry))
})

export default connect(mapStateToProps, mapDispatchToProps)(TimerContainer);
