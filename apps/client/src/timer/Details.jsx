import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Input from 'global/form/Input';

import ElapsedTime from './ElapsedTime';

const DetailsWrap = styled.div`
    flex: 1;
    display: flex;
`;

const Description = styled(Input)`
    border: none;
    flex: 1;
    padding: 15px 20px;
`;

const DetailsElapsedTime = styled(ElapsedTime)`
    font-size: ${props => props.theme.font.base.size};
    margin: auto 20px;
`;

interface Props {
    elapsedSeconds: number;
    timeEntry: TimeEntry;
    onDescriptionChange(description: string): void;
}

/**
 * Allows editing the time entry description, start and end times for the
 * currently active time entry.
 */
const Details = props => {
    const handleDescriptionChange = event => {
        props.onDescriptionChange(event.currentTarget.value);
    };

    return (
        <DetailsWrap>
            <Description value={props.timeEntry.description} onChange={handleDescriptionChange} placeholder="What are you working on?" />
            <DetailsElapsedTime elapsedSeconds={props.elapsedSeconds} />
        </DetailsWrap>
    );
};

Details.propTypes = {
    elapsedSeconds: PropTypes.number,
    timeEntry: PropTypes.object,
    onDescriptionChange: PropTypes.func
};

export default Details;
