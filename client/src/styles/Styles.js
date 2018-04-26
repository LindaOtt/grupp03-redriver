// Import of Material-UI components to create themes so handling different colors throughout the application gets easier.
import { createMuiTheme } from 'material-ui/styles'
import grey from 'material-ui/colors/grey'
import green from 'material-ui/colors/green'
import red from 'material-ui/colors/red'

const primaryColor = grey[400]
const secondaryColor = grey[600]

/**
 *  Create Material-UI theme. Edit these colors to change throughout the application.
 *
 *  @author Jimmy
 */

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: grey[300],
      main: grey[400],
      dark: grey[700]
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700]
    },
    error: {
      light: red[200],
      main: red[400],
      dark: red[600]
    }
  }
})
