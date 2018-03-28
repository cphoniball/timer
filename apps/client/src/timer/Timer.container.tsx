import * as moment from 'moment';
import * as Phoenix from 'phoenix';
import * as React from 'react';

import Timer from 'timer/Timer';

import TimeEntry from 'timer/time_entry/time_entry.interface';
import User from 'user/user.interface';

import api from 'global/api/api.provider';

interface Props {}

interface State {
    isRunning: boolean;
    timeEntry: TimeEntry;
}

const initialTimeEntry: TimeEntry = {
    description: '',
    ended_at: null,
    id: null,
    started_at: null,
    user: { id: 1, name: 'testuser', email: 'testing@test.com' }
};

export default class TimerContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            isRunning: false,
            timeEntry: initialTimeEntry
        };
    }

    public componentDidMount() {
        const socket = new Phoenix.Socket('ws://api.timer.test:4000/socket', {
            transport: WebSocket
        });
        socket.connect();

        // Join our channel and stop the timer if we receive that message
        const channel = socket.channel('time_entry:lobby', {});

        channel.on('start', payload => this.setState({ isRunning: true, timeEntry: payload }));

        channel.on('stop', payload => this.setState({ isRunning: false, timeEntry: initialTimeEntry }));

        channel.join()
            .receive('ok', res => console.log(`Joined channel`, res))
            .receive('error', res => console.log(`Unable to join channel`, res));

        // Check if we have any active entries on startup
        this.getActiveEntries();
    }

    public start = async () => {
        const timeEntry = await api.post('/time_entries', {
            time_entry: {
                ...this.state.timeEntry,
                started_at: moment().toISOString()
            }
        });

        this.setState({ isRunning: true, timeEntry });
    }

    public stop = async () => {
        await api.put(`/time_entries/${this.state.timeEntry.id}/stop`);

        this.setState({ isRunning: false, timeEntry: initialTimeEntry });
    }

    public getActiveEntries = async () => {
        const entries = await api.get('/time_entries/active');

        if (entries.length) {
            this.setState({
                isRunning: true,
                timeEntry: entries[0]
            });
        }
    }

    public render() {
        return (
            <Timer
                timeEntry={this.state.timeEntry}
                isRunning={this.state.isRunning}
                start={this.start}
                stop={this.stop}
            />
        );
    }
}
