// Import theme from Styles.js to be able to change colors etc. throughout the application.
// import {theme} from './Styles'
import grey from 'material-ui/colors/grey'

/**
 *  Styles for imported components in App.js
 *
 *  @author Jimmy
 */

const AppStyles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
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
  }

}

export default AppStyles
