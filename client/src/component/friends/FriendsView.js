import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

// Import NPM-modules
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'

// Import styles. friendsViewStyles for all imported components with a style attribute and CSS-file for classNames and id.
// import {friendsViewStyles} from '../../styles/FriendsStyles'
import '../../styles/Styles.css'
import {friendsViewStyles} from '../../styles/FriendsStyles'

// Import icons
import ChatIcon from '@material-ui/icons/ChatBubble'
import VideoIcon from '@material-ui/icons/VoiceChat'

// Import API requests
import {deleteFriend} from '../../utils/ApiRequests'

// Profile picture
import profilePhoto from '../../img/user.jpg'

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
   *  Render image tag for profile picture. A default picture renders if image url is null.
   *
   *  @author Jimmy
   */

  renderAvatar () {
    if (this.props.friendsData.avatarUrl) {
      return <img onError={this.onImageError} className='FriendsView-Avatar' src={this.props.friendsData.avatarUrl} />
    } else {
      return <img onError={this.onImageError} className='FriendsView-Avatar' src={profilePhoto} />
    }
  }

  onImageError (ev) {
    ev.target.src = profilePhoto
  }

  /**
   *  Delete friend when button is clicked.
   *
   *  @author Jimmy
   */

  handleDeleteButton () {
    deleteFriend(this.props.friendsData.username, this.props.state.token)
      .then(() => {
        return this.props.openSnackBar(this.props.friendsData.username + ' togs bort från din vänlista!')
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
          variant='subheading'
          color='primary'
          align='left'
          style={friendsViewStyles.title}
        >
          {this.props.friendsData.firstName + ' ' + this.props.friendsData.surname}
        </Typography>
        {this.renderAvatar()}
        <div className='FriendsView-Inner'>
          <div className='FriendsView-Inner-Buttons'>
              <Button variant='fab'
                      style={friendsViewStyles.button}
                      onClick={() => this.props.openChat(this.props.friendsData.username)}
              >
                <ChatIcon style={friendsViewStyles.icon}/>
              </Button>
              <Button variant='fab'
                      style={friendsViewStyles.button}
                      onClick={() => this.props.startVideoCall(this.props.friendsData.username)}
              >
                <VideoIcon style={friendsViewStyles.icon}/>
              </Button>
          </div>
          <Button onClick={this.handleDeleteButton}
            style={friendsViewStyles.deleteButton}
            color='secondary'
          >
            Ta bort {this.props.friendsData.username}
          </Button>
        </div>
      </div>
    )
  }
}

export default FriendsView
