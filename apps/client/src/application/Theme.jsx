import React from 'react';
import PropTypes from 'prop-types';

import { ThemeProvider } from 'styled-components';

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
        },
        small: {
            size: '1.4rem'
        }
    },
    layout: {
        sidebar: {
            width: '200px'
        }
    }
};

const Theme = ({ children }) => (
     <ThemeProvider theme={theme}>
        {children}
     </ThemeProvider>
);

Theme.propTypes = {
    children: PropTypes.node
};

export default Theme;
