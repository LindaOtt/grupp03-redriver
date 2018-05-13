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
      minWidth: 200,
      maxWidth: 300
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    chip: {
      margin: theme.spacing.unit / 4
    }
  },
  paper: {
    width: 283,
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    padding: 6,
    margin: 5,
    alignItems: 'center',
  },
  chatName: {
    width: '90%',
    textAlign: 'left',
    marginLeft: 6,
    cursor: 'pointer'
  }
}

export const ChatViewStyles = {
  chatView: {

  },
  button: {
    width: '20%',
    height: '80%',
    margin: 2
  },
  textInput: {
    width: '80%',
    margin: 2
  }
}

export const ChatMessageStyles = {
  avatar: {
    margin: 6
  }
}
