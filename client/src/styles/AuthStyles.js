// Import theme from Styles.js to be able to change colors etc. throughout the application.
import {theme} from './Styles'

/**
 *  Styles for imported components in the authentication directory
 *
 *  @author Jimmy
 */

export const registerStyles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  title: {
    marginLeft: 30
  },
  textField: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 20,
    width: 240,
    flexGrow: 1,
  },
  menu: {
    width: 240
  },
  imageUpload: {

    label: {
      color: theme.palette.primary.dark
    },
    container: {
      paddingTop: 15,
      width: 240,
      height: 240,
      marginLeft: 30,
      marginRight: 30
    }
  },
  button: {
    width: '100%',
    height: 60,
    marginTop: 30,
  },
  register: {
    margin: 'auto',
    maxWidth: 600,
    paddingTop: 20
  },
  loginButton: {
    width: 240,
    height: 240,
    marginRight: 30,
    marginLeft: 30
  }
}

export const loginStyles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  title: {
    marginLeft: 30
  },
  textField: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 20,
    width: '100%'
  },
  menu: {
    maxWidth: 500
  },
  button: {
    width: '100%',
    height: 60,
    marginTop: 30
  },

  loginLink: {
    textDecoration: 'none',
    color: theme.palette.primary.dark
  },
  loginLinkContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    flexGrow: 1,
  },
  loginLinkDivLeft: {
    width: '50%',
    height: 100,
    textAlign: 'left'
  },
  loginLinkDivRight: {
    width: '50%',
    height: 100,
    textAlign: 'right'
  },
  login: {
    margin: 'auto',
    maxWidth: 500,
    paddingTop: 20
  },
  loginButton: {
    maxWidth: 500,
    marginRight: 30,
    marginLeft: 30
  }
}

export const newPasswordStyles = {
  newPassword: {

  }
}
