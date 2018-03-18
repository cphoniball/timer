import * as React from 'react';

import TimeEntry from 'timer/time_entry/time_entry.interface';
import User from 'user/user.interface';

import api from 'global/api/api.provider';

interface Props {}

interface State {
    isRunning: boolean;
    timeEntry: TimeEntry;
}

class Timer extends React.Component<Props, State> {
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

        // TODO: Show the time entry we just started in the UI
        console.log(timeEntry);

        this.setState({ isRunning: true, timeEntry: { ...this.state.timeEntry, id: timeEntry.id } });
    }

    public stop = async () => {
        const timeEntry = await api.put(`/time_entries/${this.state.timeEntry.id}/stop`);

        console.log(timeEntry);

        this.setState({ isRunning: false });
    }

    public render() {
        return (
            <div className="timer">
                <h2>{this.state.isRunning ? 'The timer is running' : 'The timer is stopped'}</h2>

                {this.state.isRunning
                    ? <button onClick={this.stop}>Stop Timer</button>
                    : <button onClick={this.start}>Start Timer</button>
                }
            </div>
        );
    }
}

export default Timer;
