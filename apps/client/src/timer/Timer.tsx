import * as React from 'react';

import TimeEntry from 'timer/time_entry/time_entry.interface';

import api from 'global/api/api.provider';

interface Props {
    timeEntry: TimeEntry;
    isRunning: boolean;
    start(): Promise<any>;
    stop(): Promise<any>;
}

const Timer: React.StatelessComponent<Props> = ({ timeEntry, isRunning, start, stop  }) => {
    return (
        <div className="timer">
            <h2>{isRunning ? 'The timer is running' : 'The timer is stopped'}</h2>

            {isRunning
                ? <button onClick={stop}>Stop Timer</button>
                : <button onClick={start}>Start Timer</button>
            }
        </div>
    );
};

export default Timer;
