import { injectGlobal } from 'styled-components';

export default injectGlobal`
    body {
        padding: 0;
        margin: 0;
        font-size: 10px;
    }

    html {
        box-sizing: border-box;
        font-size: 10px;
        font-family: sans-serif;
    }

    input, textarea, select, button {
        font-size: 1.6rem;
    }

    * , *:before, *:after {
        box-sizing: inherit;
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: sans-serif;
        margin: 0;
    }

    h1 {
        font-size: 3.6rem;
    }

    h2 {
        font-size: 3rem;
    }

    h3 {
        font-size: 2.4rem;
    }
`;
