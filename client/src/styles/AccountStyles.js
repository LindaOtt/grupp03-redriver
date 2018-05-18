// Import theme from Styles.js to be able to change colors etc. throughout the application.
import {theme} from './Styles'

/**
 *  Styles for imported components in the authentication directory
 *
 *  @author Jimmy
 */

export const userAccountStyles = {

  button: {
    width: 120,
    height: 120,
    marginTop: 20,
    flexGrow: 0,
    backgroundColor: '#fcfcfc',
    borderColor: theme.palette.primary.main,
    borderWidth: 6,
    borderStyle: 'solid',
    color: theme.palette.primary.main,
    lineHeight: 1.2,
    fontSize: '20px',
    fontWeight: 'semi-bold'
  },

  title: {
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    cursor: 'pointer'
  },
  dialogTitle: {
  },
  dialog: {

  }
}
