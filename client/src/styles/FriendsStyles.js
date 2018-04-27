// Import theme from Styles.js to be able to change colors etc. throughout the application.
//import {theme} from './Styles'

/**
 *  Styles for imported components in the friends directory
 *
 *  @author Jimmy
 */

export const friendsListStyles = {

  friendsList: {},

  paper: {
    width: 293,
    display: 'flex',
    flexDirection: 'row',
    padding: 6,
    marginTop: 16,
  },
  friendsName: {
    width: '70%',
    textAlign: 'left',
    marginTop: 6,
    cursor: 'pointer'
  }
}

export const friendsViewStyles = {
  friendsView: {
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
