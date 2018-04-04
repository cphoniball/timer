import * as React from 'react';
import styled from 'styled-components';

interface Props {
    children: React.ReactNode;
    onClick(): any;
    [x: string]: any;
}

const StyledButton = styled.button`
    background-color: ${props => props.theme.color.main};
    color: ${props => props.theme.color.white};
    padding: 10px 15px;
`;

const Button: React.StatelessComponent<Props> = ({ children,...props }) => (
     <StyledButton {...props}>{children}</StyledButton>
);

export default Button;
