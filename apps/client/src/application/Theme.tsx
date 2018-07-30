import * as React from 'react';

import styled, { ThemeProvider } from 'styled-components';

const theme = {
    color: {
        background: '#EDEAE8',
        black: '#000000',
        fail: '#FF7B7E',
        grey: '#D6D3D2',
        main: '#3876B2',
        success: '#79F78C',
        warning: '#FFF8A2',
        white: '#FFFFFF',
    },
    font: {
        base: {
            size: '1.6rem'
        }
    },
    layout: {
        sidebar: {
            width: '200px'
        }
    }
};

interface Props {
    children: React.ReactNode;
}

const Theme: React.StatelessComponent<Props> = ({ children }) => (
     <ThemeProvider theme={theme}>
        {children}
     </ThemeProvider>
);

export default Theme;
