import styled from 'styled-components';

const Error = styled.div`
    background-color: ${props => props.theme.color.fail};
    padding: 10px 15px;
    border-radius: 5px;
    font-family: sans-serif;
`;

export default Error;
