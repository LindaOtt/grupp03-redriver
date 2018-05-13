import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

// Import NPM-modules
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import Avatar from 'material-ui/Avatar';

// Import styles. userAccountStyles for all imported components with a style attribute and CSS-file for classNames and id.
import {userAccountStyles} from '../../styles/AccountStyles'
import '../../styles/Styles.css'
import {friendsListStyles} from '../../styles/FriendsStyles'

// Profile picture
import profilePhoto from '../../temp/user.jpg'

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

  handleClickOpen = () => {
    this.setState({ dialog: true });
  };

  handleClose = () => {
    this.setState({ dialog: false });
  };

  renderAvatar = (friend) => {
    if (friend.avatarUrl) {
      return <Avatar alt={friend.username} src={friend.avatarUrl} style={userAccountStyles.avatar} onClick={() => {this.props.startVideoCall(friend.username)}}/>
    } else {
      return <Avatar alt={friend.username} src={profilePhoto} style={userAccountStyles.avatar} onClick={() => {this.props.startVideoCall(friend.username)}}/>
    }
  }

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
          color='textSecondary'
          align='left'
          style={userAccountStyles.title}
        >
                    Hej, {this.props.state.userInfo.username}!
        </Typography>
        <p className='AccountSecondTitle'>Kom igång genom att skicka ett meddelande nedan.</p>
        <div className='UserAccountButtonDiv'>
          <Button variant='raised'
            style={userAccountStyles.button}
            component={Link}
            to='/chats'
          >
                        Mina chattrum
          </Button>
          <Button variant='raised'
            style={userAccountStyles.button}
            component={Link}
            to='/friends'
          >
                        Mina vänner
          </Button>
          <Button variant='raised'
            style={userAccountStyles.button} onClick={this.handleClickOpen} >
                        Starta videosamtal
          </Button>
          <Button variant='raised'
            style={userAccountStyles.button} /* onClick={} */>
                        Starta livesändning
          </Button>
        </div>
        <Dialog
          PaperProps={{ unmountOnExit: true }}
          open={this.state.dialog}
          onClose={this.handleClose}
          aria-labelledby='responsive-dialog-title'
        >
          <DialogTitle id="alert-dialog-title">{"Välj vem du vill starta ett videosamtal med!"}</DialogTitle>
          <div className='UserAccount-FriendsDialog'>
            {this.renderFriendsDialog()}
          </div>
        </Dialog>
      </div>

    )
  }
}

export default UserAccount
