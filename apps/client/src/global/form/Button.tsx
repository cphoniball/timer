import * as React from 'react';
import styled from 'styled-components';

export interface ButtonProps {
    children: React.ReactNode;
    onClick?(): any;
    [x: string]: any;
}

const StyledButton = styled.button`
    background-color: ${props => props.theme.color.main};
    color: ${props => props.theme.color.white};
    padding: 10px 15px;
    border: none;
`;

const Button: React.StatelessComponent<ButtonProps> = ({ children,...props }) => (
     <StyledButton {...props}>{children}</StyledButton>
);

export default Button;
