// Import theme from Styles.js to be able to change colors etc. throughout the application.
import {theme} from './Styles'
import grey from 'material-ui/colors/grey'

/**
 *  Styles for imported components in App.js
 *
 *  @author Jimmy
 */

const AppStyles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1
  },
  titleLink: {
    float: 'right',
    width: 220,
    height: 40,
    position: 'absolute'
  },
  menuButton: {
    color: grey[100]
  },
  menu: {
    width: 250
  },
  app: {
    textAlign: 'center'
  },
  appBar: {
    flexFlow: 1
  },
  body: {

  },
  loading: {
    margin: 'auto'
  },
  HttpsRedirect: {
    width: '100%',
    height: '100%'
  },
  snackBar: {

  },
  listItem: {
    color: theme.palette.primary.main,
    fontColor: theme.palette.primary.main,
  }

}

export default AppStyles
