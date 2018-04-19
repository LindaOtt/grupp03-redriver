import { createMuiTheme } from 'material-ui/styles';
import grey from "material-ui/colors/grey";
import green from "material-ui/colors/green";

const primaryColor = grey[400];
const secondaryColor = grey[600];

export const theme = createMuiTheme({
    palette: {
        primary: {
            light: grey[200],
            main: grey[400],
            dark: grey[600],
        },
        secondary: {
            light: green[300],
            main: green[500],
            dark: green[700],
        },
    },
});

export const appStyles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        color: grey[100],
    },
    menu: {
        width: 250,
    },
};

export const registerStyles =  {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    title: {
        marginLeft: 30,
    },
    textField: {
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 20,
        width: 240,
    },
    menu: {
        width: 240,
    },
    imageUpload: {

        label: {
            color: theme.palette.primary.dark,
        },
        container: {
            paddingTop: 15,
            width: 240,
            height: 240,
            marginLeft: 30,
            marginRight: 30,
        },
    },
    button: {
        width: 240,
        height: 60,
        marginTop: 90,
    },
};

export const loginStyles =  {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    title: {
        marginLeft: 30,
    },
    textField: {
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 20,
        width: 300,
    },
    menu: {
        width: 300,
    },
    button: {
        width: 300,
        height: 60,
        marginTop: 30,
    },

    loginLink: {
        textDecoration: 'none',
        color: theme.palette.primary.dark,
    },
    loginLinkContainer: {
        width: 300,
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
    },
    loginLinkDivLeft: {
        width: 150,
        height: 100,
        textAlign: 'left',
    },
    loginLinkDivRight: {
        width: 150,
        height: 100,
        textAlign: 'right',
    },
};