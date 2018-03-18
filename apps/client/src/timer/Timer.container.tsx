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

export default class TimerContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            isRunning: false,
            timeEntry: {
                description: '',
                ended_at: null,
                id: null,
                started_at: null,
                user: { id: 1, name: 'testuser', email: 'testing@test.com' }
            }
        };
    }

    public start = async () => {
        const timeEntry = await api.post('/time_entries/start', { time_entry: this.state.timeEntry });

        this.setState({ isRunning: true, timeEntry: { ...this.state.timeEntry, id: timeEntry.id } });
    }

    public stop = async () => {
        const timeEntry = await api.put(`/time_entries/${this.state.timeEntry.id}/stop`);

        this.setState({ isRunning: false });
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
