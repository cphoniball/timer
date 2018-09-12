import moment from 'moment';
import * as Phoenix from 'phoenix';
import React, { Component } from 'react';

import Timer from 'timer/Timer';
import FinishedTimeEntries from 'timer/FinishedTimeEntries';

import timeEntryApi from './timer.api';

const initialTimeEntry = {
    description: '',
    ended_at: null,
    id: null,
    started_at: null,
    user: { id: 1, name: 'testuser', email: 'testing@test.com' }
};

export default class TimerContainer extends Component {
    state = {
        isRunning: false,
        activeTimeEntry: initialTimeEntry,
        timeEntries: []
    };

    componentDidMount() {
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

        // Check if we have any active entries on startup
        this.getActiveEntries();

        // Load existing time entries into state
        this.getTimeEntries();
    }

    start = async () => {
        const timeEntry = await timeEntryApi.start({
            ...this.state.timeEntry,
            started_at: moment().toISOString()
        });

        this.setState({ isRunning: true, timeEntry });
    }

    stop = async () => {
        await timeEntryApi.stop(this.state.timeEntry.id);

        this.setState({ isRunning: false, timeEntry: initialTimeEntry });
    }

    getTimeEntries = async () => {
        const timeEntries = await timeEntryApi.getAll();

        if (timeEntries.length) this.setState({ timeEntries });
    };

    getActiveEntries = async () => {
        const entries = await timeEntryApi.active();

        if (entries.length) {
            this.setState({
                isRunning: true,
                timeEntry: entries[0]
            });
        }
    }

    handleDescriptionChange = description => {
        this.setState({ timeEntry: { ...this.state.timeEntry, description } });
    }

    render() {
        return (
            <div>
                <Timer
                    isRunning={this.state.isRunning}
                    start={this.start}
                    stop={this.stop}
                    timeEntry={this.state.activeTimeEntry}
                    onDescriptionChange={this.handleDescriptionChange}
                />
                <FinishedTimeEntries
                    timeEntries={this.state.timeEntries}
                />
            </div>
        );
    }
}
