// Import theme from Styles.js to be able to change colors etc. throughout the application.
// import {theme} from './Styles'

/**
 *  Styles for imported components in the friends directory
 *
 *  @author Jimmy
 */

export const friendsListStyles = {

  friendsList: {},

  paper: {
    width: 283,
    display: 'flex',
    flexDirection: 'row',
    padding: 6,
    margin: 5
  },
  friendsName: {
    width: '60%',
    textAlign: 'left',
    margin: 8,
    cursor: 'pointer'
  },
  avatar: {
    margin: 6
  }
}

export const friendsViewStyles = {
  title: {
    marginLeft: 30
  },
  deleteButton: {
    alignSelf: 'center',
    marginBottom: 20
  }
}

export const friendRequestStyles = {
  friendRequests: {},

  title: {
    margin: 20
  },

  textField: {
    margin: 10
  },

  button: {

    margin: 30
  }
}
