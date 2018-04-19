import * as React from 'react';
import styled from 'styled-components';
import styledComponentsTS from 'styled-components-ts';

import Error from 'global/alert/Error';
import Button, { ButtonProps } from 'global/form/Button';
import Form from 'global/form/Form';
import Input, { InputProps } from 'global/form/Input';

import { Credentials } from 'auth/credentials.interface';

interface Props extends Credentials {
    error: string;
    onChange(event: React.FormEvent<HTMLInputElement>): void;
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

const FormGroup = styled.div`
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 10px;
`;

const Title = styled.h2`
    text-align: center;
`;

const LoginInput = styledComponentsTS<InputProps>(styled(Input))`
    width: 100%;
    margin-bottom: 10px;
`;

const Login: React.StatelessComponent<Props> = ({ email, error, password, onChange, onSubmit }) => (
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
        {error && <Error>{error}</Error>}
     </LoginPanel>
);

export default Login;
