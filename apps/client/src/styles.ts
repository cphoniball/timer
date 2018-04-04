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
    }

    input, textarea, select, button {
        font-size: 1.6rem;
    }

    * , *:before, *:after {
        box-sizing: inherit;
    }
`;
