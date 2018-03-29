import * as React from 'react';

import { ThemeProvider } from 'styled-components';

const theme = {
    background: '#EDEAE8',
    black: '#000000',
    fail: '#FF7B7E',
    main: '#3876B2',
    success: '#79F78C',
    warning: '#FFF8A2',
    white: '#FFFFFF'
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