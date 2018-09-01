import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const Input = styled.input`
    padding: 10px 15px;
`;

const StyledInput = ({ value, onChange: handleChange, ...props }) => (
    <Input value={value} onChange={handleChange} {...props} />
);

StyledInput.propTypes = {
    value: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func
};

export default StyledInput;
