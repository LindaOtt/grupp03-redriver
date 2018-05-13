import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

// Import NPM-modules
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'
import Badge from 'material-ui/Badge'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import Hidden from 'material-ui/Hidden'
import Dialog from 'material-ui/Dialog'
import Toolbar from 'material-ui/Toolbar'
import { CircularProgress } from 'material-ui/Progress'
import Avatar from 'material-ui/Avatar'

// Import styles. ChatListStyles for all imported components with a style attribute and CSS-file for classNames and id.
import {friendsListStyles} from '../../styles/FriendsStyles'
import '../../styles/Styles.css'

// Import icons
import ChatIcon from '@material-ui/icons/ChatBubble'
import VideoIcon from '@material-ui/icons/VoiceChat'
import CloseIcon from '@material-ui/icons/Close'

// Import components
import FriendsView from './FriendsView'

// API requests
import {getFriends} from '../../utils/ApiRequests'

// Profile picture
import profilePhoto from '../../temp/user.jpg'
import {requestVideoCall} from '../../utils/SignalR'

/**
 *  FriendsList-component. Starting page of friends.
 *
 *  @author Jimmy
 */

class FriendsList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      friends: [],
      isLoaded: false,
      dialog: false
    }
    this.renderAvatar = this.renderAvatar.bind(this)
  }

  /**
   *  Set friends name to view info.
   *
   *  @author Jimmy
   */

  handleFriendClick (username) {
    this.setState({
      friendsData: username
    })
  }

  /**
   *  Methods for open and close modal
   *
   *  @author Jimmy
   */

  handleDialogOpen = () => {
    this.setState({ dialog: true })
  };

  handleDialogClose = () => {
    this.setState({ dialog: false, friendsData: '' })
  };

  /**
   *  Render image tag for profile picture. A default picture renders if image url is null.
   *
   *  @author Jimmy
   */

  renderAvatar (data) {
    if (data.avatarUrl) {
      return <Avatar alt='Profile picture' src={data.avatarUrl} style={friendsListStyles.avatar} />
    } else {
      return <Avatar alt='Profile picture' src={profilePhoto} style={friendsListStyles.avatar} />
    }
  }

  /**
   *  Render list of friends
   *
   *  @author Jimmy
   */

  renderFriendsList () {
    let listArray = []

    for (let i = 0; i < this.state.friends.length; i++) {
      listArray.push(
        <Paper style={friendsListStyles.paper} elevation={1} key={this.state.friends[i].username}>
          {this.renderAvatar(this.state.friends[i])}
          <Typography
            style={friendsListStyles.friendsName}
            variant='headline'
            component='h3'
            onClick={(() => {
              this.handleFriendClick(this.state.friends[i])
              return this.handleDialogOpen()
            })}
          >
            {this.state.friends[i].username}
          </Typography>
          <IconButton aria-label='Chat'>
            <ChatIcon />
          </IconButton>
          <IconButton aria-label='Video call' onClick={() => this.props.startVideoCall(this.state.friends[i].username)} >
            <VideoIcon />
          </IconButton>
        </Paper>
      )
    }

    return listArray
  }

  /**
   *  Render list of friends. Large version. Screen sizes over 960px.
   *
   *  @author Jimmy
   */

  renderLargeFriendsList () {
    let listArray = []

    for (let i = 0; i < this.state.friends.length; i++) {
      listArray.push(
        <Paper style={friendsListStyles.paper}
          elevation={1}
          key={this.state.friends[i].surname}
        >
          {this.renderAvatar(this.state.friends[i])}
          <Typography
            style={friendsListStyles.friendsName}
            variant='headline'
            component='h3'
            onClick={() => this.handleFriendClick(this.state.friends[i])}
          >
            {this.state.friends[i].username}
          </Typography>
          <IconButton aria-label='Chat'>
            <ChatIcon />
          </IconButton>
          <IconButton aria-label='Video call' onClick={() => this.props.startVideoCall(this.state.friends[i].username)} >
            <VideoIcon />
          </IconButton>
        </Paper>
      )
    }

    return listArray
  }

  componentDidMount () {
    getFriends(this.props.state.token)
      .then((response) => {
        response.data.friendList.forEach((i) => {
          this.state.friends.push(i)
        })
      }).then(() => {
        this.setState({
          isLoaded: true
        })
      }).catch(() => {
        return this.props.openSnackBar('Något gick fel. Försök igen!')
      })
  }

  componentWillReceiveProps () {
    this.setState({
      isLoaded: true
    })
  }

  render () {
    if (this.props.state.isSignedIn === false) {
      return <Redirect to='/login' />
    }

    return (
      <div>
        {this.state.isLoaded ? (
          <div className='FriendsList'>
            <div className='FriendsList-Header'>
              <Badge badgeContent={2} color='error'>
                <Button color='primary' component={Link} to={'/friendrequests'}>
                  <Icon >add</Icon>
                  Lägg till vän
                </Button>
              </Badge>
            </div>
            <Hidden mdUp>
              <div className='FriendsList-Inner'>
                {this.renderFriendsList()}
              </div>
            </Hidden>
            <Hidden smDown>
              <div className='FriendsList-Inner-Large'>
                <div className='FriendsList-Inner-Large-Menu'>
                  {this.renderLargeFriendsList()}
                </div>
                <div className='FriendsList-Inner-Large-Content'>
                  {this.state.friendsData ? (
                    <FriendsView state={this.props.state}
                      friendsData={this.state.friendsData}
                      openSnackBar={this.props.openSnackBar}
                    />
                  ) : (
                    <Typography>
                      Klicka på en vän för att se info!
                    </Typography>
                  )}
                </div>
              </div>
            </Hidden>
            <Dialog
              fullScreen
              open={this.state.dialog}
              onClose={this.handleDialogClose}
              aria-labelledby='responsive-dialog-title'
            >
              <Toolbar>
                <IconButton color='inherit' onClick={this.handleDialogClose} aria-label='Close'>
                  <CloseIcon />
                </IconButton>
              </Toolbar>
              <FriendsView state={this.props.state}
                friendsData={this.state.friendsData}
                openSnackBar={this.props.openSnackBar}
              />
            </Dialog>
          </div>
        ) : (
          <div className='AppLoadingDiv'>
            <CircularProgress />
          </div>
        )}
      </div>

    )
  }
}

export default FriendsList
