// Import theme from Styles.js to be able to change colors etc. throughout the application.
// import {theme} from './Styles'

import {theme} from './Styles'

/**
 *  Styles for imported components in the friends directory
 *
 *  @author Jimmy
 *  @update Linda (Added styles)
 */

export const FriendsListStyles = {

  friendsList: {},

  title: {
    fontWeight: 'bold',
    fontSize: '22px',
    paddingLeft: '5%'
  },
  paper: {
    width: 283,
    display: 'flex',
    flexDirection: 'row',
    padding: 6,
    margin: 5,
    alignItems: 'center',
  },
  friendsName: {
    fontSize: '20px',
    width: '60%',
    textAlign: 'left',
    margin: 8,
    cursor: 'pointer'
  },
  avatar: {
    margin: 6
  },
  listItem: {
    color: theme.palette.primary.main,
    fontColor: theme.palette.primary.main,
  }
}

export const friendsViewStyles = {
  title: {
    marginLeft: 30,
    height: '6%'
  },
  deleteButton: {
    alignSelf: 'center',
    marginBottom: 20
  },
  button: {
    width: 80,
    height: 80,
    margin: 20,
    flexGrow: 0,
    backgroundColor: '#fcfcfc',
    borderColor: theme.palette.primary.main,
    borderWidth: 3,
    borderStyle: 'solid',
    color: theme.palette.primary.main,
  },
  icon: {
    fontSize: 40
  }
}

export const friendRequestStyles = {
  friendRequests: {},

  title: {
    margin: 20,
    marginLeft: 0,
  },

  textField: {
    margin: 10
  },

  button: {
    margin: 30,
    background: theme.palette.primary.button,
  }
}
