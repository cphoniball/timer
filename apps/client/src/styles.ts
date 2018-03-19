import { injectGlobal } from 'styled-components';

export default injectGlobal`
    body {
        padding: 0;
        margin: 0;
    }

    html {
        box-sizing: border-box;
    }

    * , *:before, *:after {
        box-sizing: inherit;
    }
`;
