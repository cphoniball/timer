import * as React from 'react';

export interface FormProps {
    children: React.ReactNode;
    onSubmit(event: React.FormEvent<HTMLFormElement>): any;
    [x: string]: any;
}

/**
 * Intercept the default form event so that we don't submit pages
 */
const Form: React.StatelessComponent<FormProps> = ({ children, onSubmit, ...props }) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        return onSubmit(event);
    };

    return <form onSubmit={handleSubmit} {...props}>{children}</form>;
};

export default Form;
