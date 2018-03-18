import * as React from 'react';

import TimeEntry from 'timer/time_entry/time_entry.interface';
import User from 'user/user.interface';

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

    public start = (): void => {
        // TODO: Api call to start the time entry
        this.setState({ isRunning: true });
    }

    public stop = (): void => {
        // TODO: Api call to stop the time entry here
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
