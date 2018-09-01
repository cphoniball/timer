import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ErrorAlert from 'global/alert/Error';
import Button  from 'global/form/Button';
import Form from 'global/form/Form';
import Input from 'global/form/Input';

const Header = styled.header`
    margin-bottom: 30px;
`;

const LoginPanel = styled.div`
    width: 400px;
    position: fixed;
    left: 50%;
    top: 40%;
    transform: translateX(-50%) translateY(-50%);
    padding: 30px;
    background-color: ${props => props.theme.color.white};
    border: 1px solid ${props => props.theme.color.grey};
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 10px;
`;

const Title = styled.h2`
    text-align: center;
`;

const LoginInput = styled(Input)`
    width: 100%;
    margin-bottom: 10px;
`;

const Login = ({ email, error, password, onChange, onSubmit }) => (
     <LoginPanel>
        <Header>
            <Title>Log In</Title>
        </Header>
        <Form onSubmit={onSubmit}>
            <LoginInput name="email" value={email} onChange={onChange} placeholder="Email" />
            <LoginInput name="password" type="password" value={password} onChange={onChange} placeholder="Password" />
            <FormGroup>
                <Button type="submit" disabled={email.length && password.length ? false : true}>Log In</Button>
            </FormGroup>
        </Form>
        {error && <ErrorAlert>{error}</ErrorAlert>}
     </LoginPanel>
);

Login.propTypes = {
    error: PropTypes.string,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func
};

export default Login;
