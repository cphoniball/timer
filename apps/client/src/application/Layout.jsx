import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Theme from './Theme';

const ApplicationWrapper = styled.div`
    background-color: ${props => props.theme.color.background};
    padding: 40px;
    padding-left: calc(${props => props.theme.layout.sidebar.width} + 40px);
    min-height: 100vh;
`;

const Layout = ({ children }) => (
    <Theme>
        <ApplicationWrapper>
            {children}
        </ApplicationWrapper>
    </Theme>
);

Layout.propTypes = {
    children: PropTypes.node
};

export default Layout;
