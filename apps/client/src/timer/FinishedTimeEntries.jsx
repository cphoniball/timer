import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

const TimeEntry = ({ timeEntry }) => (
    <li>
        <span>{timeEntry.description}</span>
        <span>Started: {timeEntry.started_at}</span>
        <span>Ended: {timeEntry.ended_at}</span>
    </li>
);

const FinishedTimeEntries = ({ timeEntries }) => (
    <ul>
        {timeEntries.map(timeEntry => <TimeEntry timeEntry={timeEntry} />)}
    </ul>
);

FinishedTimeEntries.propTypes = {
    timeEntries: PropTypes.array
};

export default FinishedTimeEntries;
