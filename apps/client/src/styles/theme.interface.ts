export default interface Theme {
    color: {
        background: string;
        black: string;
        fail: string;
        grey: string;
        main: string;
        success: string;
        warning: string;
        white: string;
    };
    font: {
        base: {
            size: string;
        };
    };
    layout: {
        sidebar: {
            width: string;
        };
    };
}
