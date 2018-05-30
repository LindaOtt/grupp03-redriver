import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

// Import NPM-modules
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Dialog, {
  DialogTitle,
} from 'material-ui/Dialog'
import Avatar from 'material-ui/Avatar';

// Import styles. userAccountStyles for all imported components with a style attribute and CSS-file for classNames and id.
import {userAccountStyles} from '../../styles/AccountStyles'
import '../../styles/Styles.css'

// Profile picture
import profilePhoto from '../../img/user.jpg'

/**
 *  User account. Starting page with links to chat, friends etc.
 *
 *  @author Jimmy
 */

class UserAccount extends Component {
  constructor (props) {
    super(props)

    this.state = {
      dialog: false,

    }
  }

  /**
   *  Handle open and close for the create video call dialog
   *
   *  @author Jimmy
   */

  handleClickOpen = () => {
    this.setState({ dialog: true });
  };

  handleClose = () => {
    this.setState({ dialog: false });
  };

  /**
   *  Render friend avatars in the create video call dialog
   *
   *  @author Jimmy
   */

  renderAvatar = (friend) => {
    if (friend.avatarUrl) {
      return <Avatar alt={friend.username} src={friend.avatarUrl} style={userAccountStyles.avatar} onClick={() => {this.props.startVideoCall(friend.username)}}/>
    } else {
      return <Avatar alt={friend.username} src={profilePhoto} style={userAccountStyles.avatar} onClick={() => {this.props.startVideoCall(friend.username)}}/>
    }
  }

  /**
   *  Render dialog used to start a video call
   *
   *  @author Jimmy
   */

  renderFriendsDialog = () => {
    let tempArray = []

    for (let i = 0; i < this.props.state.friends.length; i++) {
      tempArray.push(
        <div key={this.props.state.friends[i].username} className='UserAccount-FriendsAvatar'>
          {this.renderAvatar(this.props.state.friends[i])}
          <Typography
            variant='subheading'
            color='primary'
            align='center'
          >
            {this.props.state.friends[i].username}
          </Typography>
        </div>
      )
    }
    return tempArray
  }

  render () {
    if (this.props.state.isSignedIn === false) {
      return <Redirect to='/login' />
    }

    return (
      <div className='UserAccount'>
        <Typography
          variant='headline'
          color='primary'
          align='left'
          style={userAccountStyles.title}
        >
                    Hej, {this.props.state.userInfo.firstName}!
        </Typography>
        <Typography
          variant='subheading'
          color='primary'
          align='left'
          style={userAccountStyles.title}
        >
          Kom igång genom att chatta eller starta ett videosamtal nedan.
        </Typography>
        <div className='UserAccountButtonDiv'>
          <Button variant='fab'
            style={userAccountStyles.button}
            component={Link}
            to='/chats'
          >
                        Chatta
          </Button>
          <Button variant='fab'
            style={userAccountStyles.button}
            component={Link}
            to='/friends'
          >
                        Vänner
          </Button>
          <Button variant='fab'
            style={userAccountStyles.button} onClick={this.handleClickOpen} >
                        Starta Video
          </Button>
          <Button variant='fab'
            style={userAccountStyles.button} /* onClick={} */>
                        Starta live
          </Button>
        </div>
        <Dialog
          open={this.state.dialog}
          onClose={this.handleClose}
          aria-labelledby='responsive-dialog-title'
          style={userAccountStyles.dialog}
        >
          <DialogTitle style={userAccountStyles.dialogTitle} id="alert-dialog-title">{"Välj vem du vill starta ett videosamtal med!"}</DialogTitle>
          <div className='UserAccount-FriendsDialog'>
            {this.renderFriendsDialog()}
          </div>
        </Dialog>
      </div>

    )
  }
}

export default UserAccount
