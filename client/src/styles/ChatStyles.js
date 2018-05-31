// Import theme from Styles.js to be able to change colors etc. throughout the application.
import {theme} from './Styles'

/**
 *  Styles for imported components in the chat directory
 *
 *  @author Jimmy
 *  @update Linda (Added styles)
 */

export const ChatListStyles = {
  chatList: {

  },
  title: {
    fontWeight: 'bold',
    fontSize: '22px',
    margin: 'auto',
    width: 100,
  },
  formControl: {
    root: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    darkText: {
      'color': theme.palette.primary.dark
    },
    boldText: {
      fontWeight: 'bold'
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
    cursor: 'pointer'
  },
  chatName: {
    fontSize: '95%',
    width: '96%',
    textAlign: 'left',
    marginLeft: 6,
  },
  chatMessage: {
    fontSize: '70%',
    width: '96%',
    textAlign: 'left',
    marginLeft: 6,
  },
  chatDate: {
    fontSize: '56%',
  },
  listItem: {
    color: theme.palette.primary.main,
    fontColor: theme.palette.primary.main,
  }
}

export const ChatViewStyles = {
  chatView: {

  },
  button: {
    width: '20%',
    height: '80%',
    margin: 2,
    background: theme.palette.primary.button
  },
  textInput: {
    width: '80%',
    margin: 2
  },
  listItem: {
    color: theme.palette.primary.main,
    fontColor: theme.palette.primary.main,
  }
}

export const ChatMessageStyles = {
  avatar: {
    margin: 6
  }
}