import * as React from 'react';
import styled from 'styled-components';

import Theme from 'application/Theme';

const ApplicationWrapper = styled.div`
    background-color: white;
    padding: 40px;
    min-height: 100vh;
`;

interface Props {
    children: React.ReactNode;
}

const Layout: React.StatelessComponent<Props> = ({ children }) => (
    <ApplicationWrapper>
        <Theme>
            {children}
        </Theme>
    </ApplicationWrapper>
);

export default Layout;
