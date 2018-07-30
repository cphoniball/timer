import * as React from 'react';
import styled from 'styled-components';

import Theme from 'application/Theme';

const ApplicationWrapper = styled.div`
    background-color: ${props => props.theme.color.background};
    padding: 40px;
    padding-left: calc(${props => props.theme.layout.sidebar.width} + 40px);
    min-height: 100vh;
`;

interface Props {
    children: React.ReactNode;
}

const Layout: React.StatelessComponent<Props> = ({ children }) => (
    <Theme>
        <ApplicationWrapper>
            {children}
        </ApplicationWrapper>
    </Theme>
);

export default Layout;
