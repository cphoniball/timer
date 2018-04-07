import * as React from 'react';
import styled from 'styled-components';
import styledComponentsTS from 'styled-components-ts';

import Input, { InputProps } from 'global/form/Input';

import ElapsedTime, { Props as ElapsedTimeProps } from 'timer/ElapsedTime';
import TimeEntry from 'timer/time_entry/time_entry.interface';

const DetailsWrap = styled.div`
    flex: 1;
    display: flex;
`;

const Description = styledComponentsTS<InputProps>(styled(Input))`
    border: none;
    flex: 1;
    padding: 15px 20px;
`;

const DetailsElapsedTime = styledComponentsTS<ElapsedTimeProps>(styled(ElapsedTime))`
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
const Details: React.StatelessComponent<Props> = props => {
    const handleDescriptionChange = (event: React.FormEvent<HTMLInputElement>) => {
        props.onDescriptionChange(event.currentTarget.value);
    };

    return (
        <DetailsWrap>
            <Description value={props.timeEntry.description} onChange={handleDescriptionChange} />
            <DetailsElapsedTime elapsedSeconds={props.elapsedSeconds} />
        </DetailsWrap>
    );
};

export default Details;
