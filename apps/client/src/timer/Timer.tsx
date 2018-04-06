import * as React from 'react';
import styled from 'styled-components';

import * as moment from 'moment';

import Button from 'global/form/Button';
import Details from 'timer/Details';
import TimeEntry from 'timer/time_entry/time_entry.interface';

import api from 'global/api/api.provider';

import { formatSeconds } from 'timer/timer.utilities';

const TimerPanel = styled.div`
    background-color: white;
    box-shadow: 1px 1px 1px black;
    padding: 30px;
    display: inline-block;
    width: 100%;
    display: flex;
`;

interface Props {
    timeEntry: TimeEntry;
    isRunning: boolean;
    start(): Promise<any>;
    stop(): Promise<any>;
    onDescriptionChange(description: string): void;
}

interface State {
    elapsedSeconds: number;
}

class Timer extends React.Component<Props, State> {
    public displayUpdateInterval: number;

    constructor(props: Props) {
        super(props);

        this.state = {
            elapsedSeconds: this.calculateElapsedSeconds(this.props.timeEntry)
        };
    }

    public componentWillReceiveProps(newProps: Props) {
        if (newProps.timeEntry.started_at !== this.props.timeEntry.started_at) {
            this.setState({
                elapsedSeconds: this.calculateElapsedSeconds(newProps.timeEntry)
            }, this.setDisplayUpdateInterval);
        }
    }

    public calculateElapsedSeconds(timeEntry: TimeEntry): number {
        if (!timeEntry.started_at) return 0;

        return moment().diff(moment(timeEntry.started_at), 'seconds');
    }

    /**
     * Sets an interval for us to update the seconds displayed on the clock
     */
    public setDisplayUpdateInterval() {
        this.displayUpdateInterval = setInterval(() => {
            this.setState({
                elapsedSeconds: this.calculateElapsedSeconds(this.props.timeEntry)
            });
        }, 1000);
    }

    public stop = () => {
        clearInterval(this.displayUpdateInterval);

        this.setState({ elapsedSeconds: 0 });

        this.props.stop();
    }

    public render() {
        const { timeEntry, isRunning, start, stop } = this.props;

        return (
            <TimerPanel>
                <Details onDescriptionChange={this.props.onDescriptionChange} timeEntry={timeEntry} />
                {!!this.state.elapsedSeconds && <div>
                    {formatSeconds(this.state.elapsedSeconds)}
                </div>}

                {isRunning
                    ? <Button onClick={this.stop}>Stop Timer</Button>
                    : <Button onClick={start}>Start Timer</Button>
                }
            </TimerPanel>
        );
    }
}

export default Timer;
