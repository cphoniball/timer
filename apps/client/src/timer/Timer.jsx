import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import moment from 'moment';

import Button from 'global/form/Button';
import Details from './Details';

const TimerPanel = styled.div`
    background-color: white;
    display: inline-block;
    width: 100%;
    display: flex;
`;

class Timer extends Component {
    static propTypes = {
        timeEntry: PropTypes.object,
        isRunning: PropTypes.bool,
        start: PropTypes.func,
        stop: PropTypes.func,
        onDescriptionChange: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            elapsedSeconds: this.calculateElapsedSeconds(props.timeEntry)
        };
    }

    componentWillReceiveProps(newProps) {
        if (newProps.timeEntry.started_at !== this.props.timeEntry.started_at) {
            this.setState({
                elapsedSeconds: this.calculateElapsedSeconds(newProps.timeEntry)
            }, this.setDisplayUpdateInterval);
        }
    }

    calculateElapsedSeconds(timeEntry) {
        if (!timeEntry.started_at) return 0;

        return moment().diff(moment(timeEntry.started_at), 'seconds');
    };

    /**
     * Sets an interval for us to update the seconds displayed on the clock
     */
    setDisplayUpdateInterval() {
        this.displayUpdateInterval = setInterval(() => {
            this.setState({
                elapsedSeconds: this.calculateElapsedSeconds(this.props.timeEntry)
            });
        }, 1000);
    }

    stop = () => {
        clearInterval(this.displayUpdateInterval);

        this.setState({ elapsedSeconds: 0 });

        this.props.stop();
    }

    render() {
        const { timeEntry, isRunning, start, stop } = this.props;

        return (
            <TimerPanel>
                <Details onDescriptionChange={this.props.onDescriptionChange} timeEntry={timeEntry} elapsedSeconds={this.state.elapsedSeconds} />

                {timeEntry.started_at
                    ? <Button onClick={this.stop}>Stop Timer</Button>
                    : <Button onClick={start}>Start Timer</Button>
                }
            </TimerPanel>
        );
    }
}

export default Timer;
