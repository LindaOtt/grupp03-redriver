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
    }
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