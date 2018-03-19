import * as React from 'react';
import styled from 'styled-components';

const ApplicationWrapper = styled.div`
    background-color: white;
    padding: 40px;
    min-height: 100vh;
`;

interface Props {
    children: React.ReactChildren;
}

const Layout: React.StatelessComponent = ({ children }) => (
    <ApplicationWrapper>
        {children}
    </ApplicationWrapper>
);

export default Layout;
