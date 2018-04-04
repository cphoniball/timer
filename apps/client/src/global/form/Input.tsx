import * as React from 'react';
import styled from 'styled-components';

const Input = styled.input`
    padding: 15px 20px;
`;

export interface InputProps {
    className?: string;
    value: string;
    onChange(): void;
    [x: string]: any;
}

const StyledInput: React.StatelessComponent<InputProps> = ({ value, onChange, ...props }) => (
    <Input value={value} onChange={onChange} {...props} />
);

export default StyledInput;
