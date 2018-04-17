import * as React from 'react';
import styled from 'styled-components';
import styledComponentsTS from 'styled-components-ts';

import Button, { ButtonProps } from 'global/form/Button';
import Input, { InputProps } from 'global/form/Input';

interface Props {
    email: string;
    password: string;
    onChange(): void;
    onSubmit(): void;
}

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

const Title = styled.h2`
    text-align: center;
`;

const LoginInput = styledComponentsTS<InputProps>(styled(Input))`
    width: 100%;
    margin-bottom: 10px;
`;

const SubmitButton = styledComponentsTS<ButtonProps>(styled(Button))`
    float: right;
`;

const Login: React.StatelessComponent<Props> = ({ email, password, onChange, onSubmit }) => (
     <LoginPanel>
        <Header>
            <Title>Log In</Title>
        </Header>
        <form onSubmit={onSubmit}>
            <LoginInput name="email" value={email} onChange={onChange} placeholder="Email" />
            <LoginInput name="password" type="password" value={password} onChange={onChange} placeholder="Password" />
            <SubmitButton type="submit" disabled={email.length && password.length ? false : true}>Log In</SubmitButton>
        </form>
     </LoginPanel>
);

export default Login;
