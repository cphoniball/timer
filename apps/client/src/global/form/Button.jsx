import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
    background-color: ${props => props.theme.color.main};
    color: ${props => props.theme.color.white};
    padding: 10px 15px;
    border: none;
`;

// TODO: Update this button to accept different colors
const Button = ({ children, ...props }) => (
     <StyledButton {...props}>{children}</StyledButton>
);

Button.propTypes = {
    children: PropTypes.node
};

export default Button;
