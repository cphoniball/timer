import * as React from 'react';
import styled from 'styled-components';
import styledComponentsTS from 'styled-components-ts';

import Input, { InputProps } from 'global/form/Input';

import TimeEntry from 'timer/time_entry/time_entry.interface';

const DetailsWrap = styled.div`
    padding: 15px 20px;
    flex: 1;
`;

interface Props {
    timeEntry: TimeEntry;
    onDescriptionChange(description: string): void;
}

/**
 * Allows editing the time entry description, start and end times for the
 * currently active time entry.
 */
const Details: React.StatelessComponent<Props> = props => {
    const handleDescriptionChange = (event: React.FormEvent<HTMLInputElement>) => {
        props.onDescriptionChange(event.currentTarget.value);
    };

    return (
        <DetailsWrap>
            <Input value={props.timeEntry.description} onChange={handleDescriptionChange} />
        </DetailsWrap>
    );
};

export default Details;
