import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const ModalContainer = styled.div`
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000px;
    background-color: ${props => props.theme.color.white};
    padding: 30px;
`;

const Modal = ({ children }) => {
    return (
        <ModalContainer>
            {children}
        </ModalContainer>
    );
}

Modal.propTypes = {
    children: PropTypes.node
};

export default Modal;
