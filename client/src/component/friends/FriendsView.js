import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

// Import NPM-modules
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'

// Import styles. friendsViewStyles for all imported components with a style attribute and CSS-file for classNames and id.
// import {friendsViewStyles} from '../../styles/FriendsStyles'
import '../../styles/Styles.css'
import {friendsViewStyles} from '../../styles/FriendsStyles'

// Import API requests
import {deleteFriend} from '../../utils/ApiRequests'

/**
 *  FriendsView-component. View for a friends page. See info about friend,
 *  start a new chat and make a video call.
 *
 *  @author Jimmy
 */

class FriendsView extends Component {
  constructor (props) {
    super(props)

    this.state = {

    }
    this.handleDeleteButton = this.handleDeleteButton.bind(this)
  }

  /**
   *  Delete friend when button is clicked.
   *
   *  @author Jimmy
   */

  handleDeleteButton() {
    deleteFriend(this.props.friendsUsername, this.props.state.token)
      .then(() => {
        return this.props.openSnackBar(this.props.friendsUsername + ' togs bort från din vänlista!')
      })
      .catch(() => {
      return this.props.openSnackBar('Något gick fel. Försök igen!')
    })
  }
  render () {
    if (this.props.state.isSignedIn === false) {
      return <Redirect to='/login' />
    }

    return (
      <div className='FriendsView'>
        <Typography
          variant='headline'
          color='default'
          align='left'
          style={friendsViewStyles.title}
        >
          {this.props.friendsUsername}
        </Typography>
        <Button onClick={this.handleDeleteButton}
                style={friendsViewStyles.deleteButton}
                color='secondary'
        >
          Ta bort {this.props.friendsUsername} från din vänlista
        </Button>
      </div>
    )
  }
}

export default FriendsView
