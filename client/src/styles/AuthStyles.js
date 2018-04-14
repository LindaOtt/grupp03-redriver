import {theme} from "./Styles";

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
    register: {
        margin: 'auto',
        maxWidth: 600,
        paddingTop: 20,
    },
    loginButton: {
        width: 240,
        height: 240,
        marginRight: 30,
        marginLeft: 30,
    }
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
    login: {
        margin: 'auto',
        maxWidth: 360,
        paddingTop: 20,
    },
    loginButton: {
        width: 300,
        marginRight: 30,
        marginLeft: 30,
    }
};

export const newPasswordStyles =  {
    newPassword: {

    },
};