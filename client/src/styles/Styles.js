// Import of Material-UI components to create themes so handling different colors throughout the application gets easier.
import { createMuiTheme } from 'material-ui/styles'
import grey from 'material-ui/colors/grey'
import red from 'material-ui/colors/red'

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
      light: red[200],
      main: red[400],
      dark: red[600]
    }
  }
})
