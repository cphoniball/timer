import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import moment from 'moment';

const TIME_FORMAT = 'h:mm a';

// TODO: These are the same as the client conatiners, we can reuse these styles
const TimeEntryList = styled.ul`
    display: block;
    width: 100%;
    list-style: none;
    margin-top: 30px;
`;

const TimeEntryListItem = styled.li`
    width: 100%;
    font-size: ${props => props.theme.font.base.size};
    margin-bottom: 15px;
    padding: 10px 12px;
    background-color: ${props => props.theme.color.white};
    box-shadow: 0px 1px 2px ${props => props.theme.color.main}88;
    clear: both;
`;

const TimeEntryTime = styled.span`
    float: right;
    font-size: ${props => props.theme.font.small.size};
`;

const TimeEntry = ({ timeEntry }) => (
    <TimeEntryListItem className="clearfix">
        <span>{timeEntry.description}</span>
        <TimeEntryTime>{moment(timeEntry.started_at).format(TIME_FORMAT)} - {moment(timeEntry.ended_at).format(TIME_FORMAT)}</TimeEntryTime>
    </TimeEntryListItem>
);

const FinishedTimeEntries = ({ timeEntries }) => (
    <TimeEntryList>
        {timeEntries.map(timeEntry => <TimeEntry key={timeEntry.id} timeEntry={timeEntry} />)}
    </TimeEntryList>
);

FinishedTimeEntries.propTypes = {
    timeEntries: PropTypes.array
};

export default FinishedTimeEntries;
