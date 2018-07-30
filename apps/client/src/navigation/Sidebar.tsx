import * as React from 'react';
import styled from 'styled-components';

import { NavLink } from 'react-router-dom';

const SidebarContainer = styled.nav`
    background-color: ${props => props.theme.color.main};
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    padding: 30px;
    width: ${props => props.theme.layout.sidebar.width};
`;

const SidebarLink = styled(NavLink)`
    display: block;
    color: white;
    width: 100%;
    margin-bottom: 20px;
    font-size: ${props => props.theme.font.base.size};
    text-decoration: none;

    &.active {
        font-weight: bold;
    }
`;

const Sidebar: React.StatelessComponent<{}> = () => (
    <SidebarContainer>
        <SidebarLink to="/timer">Timer</SidebarLink>
        <SidebarLink to="/clients">Clients</SidebarLink>
    </SidebarContainer>
);

export default Sidebar;
