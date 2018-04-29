// Import theme from Styles.js to be able to change colors etc. throughout the application.
import {theme} from './Styles'

/**
 *  Styles for imported components in the chat directory
 *
 *  @author Jimmy
 */

export const ChatListStyles = {
  chatList: {

  },
  formControl: {
    root: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
      maxWidth: 300
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    chip: {
      margin: theme.spacing.unit / 4
    }
  }
}

export const ChatViewStyles = {
  chatView: {

  }
}
