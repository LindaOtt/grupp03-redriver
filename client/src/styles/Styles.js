// Import of Material-UI components to create themes so handling different colors throughout the application gets easier.
import { createMuiTheme } from 'material-ui/styles'
import grey from 'material-ui/colors/blueGrey'
import red from 'material-ui/colors/red'

/**
 *  Create Material-UI theme. Edit these colors to change throughout the application.
 *
 *  @author Jimmy
 */

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: grey[400],
      main: grey[700],
      dark: grey[900],
      button: grey[600],
    },

    error: {
      light: red[400],
      main: red[600],
      dark: red[800]
    },
    textColor: grey[700],
  }
})
