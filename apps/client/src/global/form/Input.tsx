import * as React from 'react';
import styled from 'styled-components';

const Input = styled.input`
    padding: 10px 15px;
`;

export interface InputProps {
    className?: string;
    value: string;
    onChange(event: React.FormEvent<HTMLInputElement>): void;
    [x: string]: any;
}

const StyledInput: React.StatelessComponent<InputProps> = ({ value, onChange: handleChange, ...props }) => (
    <Input value={value} onChange={handleChange} {...props} />
);

export default StyledInput;
