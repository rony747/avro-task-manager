import {createTheme} from "react-data-table-component";

function TableTheme() {
    return createTheme('solarized', {
        text: {
            primary: '#fff',
            secondary: '#ddd',
        },
        background: {
            default: 'transparent',
        },
        context: {
            background: '#cb4b16',
            text: '#FFFFFF',
        },
        divider: {
            default: '#222',
        },
        striped: {
            default: '#121212',
            text: '#fff',
        },

    }, 'dark');
}

export default TableTheme