import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

// Import NPM-modules
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import Hidden from 'material-ui/Hidden'
import Dialog from 'material-ui/Dialog'
import Toolbar from 'material-ui/Toolbar'
import { CircularProgress } from 'material-ui/Progress'
import Avatar from 'material-ui/Avatar'

// Import styles. FriendsListStyles for all imported components with a style attribute and CSS-file for classNames and id.
import {FriendsListStyles} from '../../styles/FriendsStyles'
import '../../styles/Styles.css'

// Import icons
import ChatIcon from '@material-ui/icons/ChatBubble'
import VideoIcon from '@material-ui/icons/VoiceChat'
import CloseIcon from '@material-ui/icons/Close'

// Import components & utils
import FriendsView from './FriendsView'
import ChatView from '../chat/ChatView'
import {createChatGroupWithUsers} from '../../utils/SignalR'
import {getFriends, getGroupInfo, getGroups} from '../../utils/ApiRequests'

// Profile picture
import profilePhoto from '../../img/user.jpg'

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
      dialog: false,
      chatDialog: false,
      chatName: ''
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
   *  Methods for open and close chat dialog
   *
   *  @author Jimmy
   */

  handleChatDialogOpen = () => {
    this.setState({ chatDialog: true })
  }

  handleChatDialogClose = () => {
    this.setState({ chatDialog: false })
  }

  /**
   *  Render image tag for profile picture. A default picture renders if image url is null.
   *
   *  @author Jimmy
   */

  renderAvatar (data) {
    if (data.avatarUrl) {
      return <Avatar alt='Profile picture' src={data.avatarUrl} style={FriendsListStyles.avatar} />
    } else {
      return <Avatar alt='Profile picture' src={profilePhoto} style={FriendsListStyles.avatar} />
    }
  }

  /**
   *  Open chat dialog. A new chat is created if not already exists.
   *
   *  @author Jimmy
   */

  openChat = (user) => {

    this.setState({isLoaded: false})
    let completedRequests = 0;
    let groupArray = [user]
    groupArray.push(this.props.state.userInfo.username)

    getGroups(this.props.state.token)
      .then((response) => {
        if(response.data.groupList.length < 1) {
          createChatGroupWithUsers(this.props.state.signalRConnection, groupArray)
            .then((response) => {
              console.log('New group')
              this.openChat(user)
            })

        } else {
          let tempName = ''
          for (let i = 0; i < response.data.groupList.length; i++) {
            getGroupInfo(this.props.state.token, response.data.groupList[i])
              .then((responseTwo) => {
                completedRequests++
                if (responseTwo.data.members.sort().join(',') === groupArray.sort().join(',')) {
                  tempName = responseTwo.data.groupName
                }
                if (completedRequests === response.data.groupList.length) {
                  if (tempName === '') {
                    createChatGroupWithUsers(this.props.state.signalRConnection, groupArray)
                      .then((response) => {
                        console.log('New group')
                        this.openChat(user)
                      })
                  } else {
                    this.setState({
                      chatName: tempName,
                      chatDialog: true,
                      dialog: false,
                      isLoaded: true
                    })
                  }
                }
              })
          }
        }
      }).catch(() => {
      this.setState({
        chatName: '',
        chatDialog: false,
        isLoaded: true
      })
      return this.props.openSnackBar('Något gick fel. Försök igen!')
    })
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
        <Paper style={FriendsListStyles.paper} elevation={1} key={this.state.friends[i].username}>
          {this.renderAvatar(this.state.friends[i])}
          <Typography
            style={FriendsListStyles.friendsName}
            variant='headline'
            color='primary'
            onClick={(() => {
              this.handleFriendClick(this.state.friends[i])
              return this.handleDialogOpen()
            })}
          >
            {this.state.friends[i].username}
          </Typography>
          <IconButton aria-label='Chat' >
            <ChatIcon style={FriendsListStyles.listItem} onClick={() => this.openChat(this.state.friends[i].username)}/>
          </IconButton>
          <IconButton aria-label='Video call' onClick={() => this.props.startVideoCall(this.state.friends[i].username)} >
            <VideoIcon style={FriendsListStyles.listItem}/>
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
        <Paper style={FriendsListStyles.paper}
          elevation={1}
          key={this.state.friends[i].username}
        >
          {this.renderAvatar(this.state.friends[i])}
          <Typography
            style={FriendsListStyles.friendsName}
            variant='headline'
            color='primary'
            onClick={() => this.handleFriendClick(this.state.friends[i])}
          >
            {this.state.friends[i].username}
          </Typography>
          <IconButton aria-label='Chat'>
            <ChatIcon style={FriendsListStyles.listItem}/>
          </IconButton>
          <IconButton aria-label='Video call' onClick={() => this.props.startVideoCall(this.state.friends[i].username)} >
            <VideoIcon style={FriendsListStyles.listItem}/>
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
                <Button color='primary' component={Link} to={'/friendrequests'}>
                  <Icon >add</Icon>
                  Lägg till vän
                </Button>
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
                                 startVideoCall={this.props.startVideoCall}
                    />
                  ) : (
                    <Typography
                      style={FriendsListStyles.title}
                    >
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
                  <CloseIcon style={FriendsListStyles.listItem}/>
                </IconButton>
              </Toolbar>
              <FriendsView state={this.props.state}
                friendsData={this.state.friendsData}
                openSnackBar={this.props.openSnackBar}
                           startVideoCall={this.props.startVideoCall}
                           openChat={this.openChat}
              />
            </Dialog>
            <Dialog
              fullScreen
              open={this.state.chatDialog}
              onClose={this.handleChatDialogClose}
              aria-labelledby='responsive-dialog-title'
            >

              <IconButton color='primary' onClick={this.handleChatDialogClose} aria-label='Close'>
                <CloseIcon />
              </IconButton>
              <ChatView state={this.props.state}
                        chatContent={this.state.chatName}
                        updateComponent={this.handleChatDialogClose}
                        friends={this.state.friends}
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
