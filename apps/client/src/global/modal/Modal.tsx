import * as React from 'react';
import styled from 'styles/components';

interface Props {
    children: React.ReactNode;
}

const ModalContainer = styled.div`
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000px;
    background-color: ${props => props.theme.color.white};
    padding: 30px;
`;

const Modal: React.SFC<Props> = ({ children }) => {
    return (
        <ModalContainer>
            {children}
        </ModalContainer>
    );
}

export default Modal;
