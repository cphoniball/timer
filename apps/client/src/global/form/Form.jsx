import React from 'react';
import PropTypes from 'prop-types';

/**
 * Intercept the default form event so that we don't submit pages
 */
const Form = ({ children, onSubmit, ...props }) => {
    const handleSubmit = event => {
        event.preventDefault();
        return onSubmit(event);
    };

    return <form onSubmit={handleSubmit} {...props}>{children}</form>;
};

Form.propTypes = {
    children: PropTypes.node,
    onSubmit: PropTypes.func
};

export default Form;
