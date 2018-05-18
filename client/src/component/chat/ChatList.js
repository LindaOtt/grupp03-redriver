import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

// Import NPM-modules
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'
import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { FormControl } from 'material-ui/Form'
import Select from 'material-ui/Select'
import Chip from 'material-ui/Chip'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import Hidden from 'material-ui/Hidden'
import { CircularProgress } from 'material-ui/Progress'
import Avatar from 'material-ui/Avatar'

// Import Icons
import CloseIcon from '@material-ui/icons/Close'

// Import styles. ChatListStyles for all imported components with a style attribute and CSS-file for classNames and id.
import {ChatListStyles} from '../../styles/ChatStyles'
import '../../styles/Styles.css'
import {theme} from '../../styles/Styles'

// Profile picture
import profilePhoto from '../../temp/user.jpg'

import {getFriends, getGroupInfo, getGroups} from '../../utils/ApiRequests'
import {createChatGroupWithUsers} from '../../utils/SignalR'
import ChatView from './ChatView'

/**
 *  ChatList-component. Starting page of chat.
 *
 *  @author Jimmy
 */

class ChatList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      chats: [],
      friends: [],
      selectedFriends: [],
      groups: [],
      isLoaded: false,
      dialog: false,
      chatDialog: false
    }
  }

  /**
   *  Set friends name to view info.
   *
   *  @author Jimmy
   */

  updateComponent = () => {
    getGroups(this.props.state.token)
      .then((response) => {

        console.log(response)
        let tempArray = []
        for (let i = 0; i < response.data.groupList.length; i++) {
          getGroupInfo(this.props.state.token, response.data.groupList[i])
            .then((responseTwo) => {
              console.log(responseTwo)
              tempArray.push(responseTwo.data)
            }).then(() => {
            if(i === response.data.groupList.length - 1) {
              setTimeout(() => {
                this.setState({
                  groups: tempArray,
                  isLoaded: true,
                  chatDialog: false,
                  dialog: false,
                  chatName: ''
                })
              }, 200)
            }
          })
        }
      }).catch(() => {
      return this.props.openSnackBar('Något gick fel. Försök igen!')
    })
  }

  /**
   *  Set friends name to view info.
   *
   *  @author Jimmy
   */

  handleChatClick (name) {
    this.setState({
      chatName: name
    })
  }

  /**
   *  Methods for open and close new chat dialog
   *
   *  @author Jimmy
   */

  handleDialogOpen = () => {
    this.setState({ dialog: true })
  }

  handleDialogClose = () => {
    this.setState({ dialog: false })
  }

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
   *  Add friends when starting a new chat.
   *
   *  @author Jimmy
   */

  handleFriendsSelect = event => {
    this.setState({ selectedFriends: event.target.value })
  }

  /**
   *  Create new chat. Array with included friends is converted to a string to name the chat.
   *
   *  @author Jimmy
   */

  createNewChat = () => {
    this.setState({
      isLoaded: false,
      chatDialog: false,
      dialog: false
    })
    let groupArray = this.state.selectedFriends
    groupArray.push(this.props.state.userInfo.username)

    createChatGroupWithUsers(this.props.state.signalRConnection, groupArray)
      .catch(() => {
        return this.props.openSnackBar('Något gick fel. Försök igen!')
      })
  }

  /**
   *  Cancel new chat. Delete selected friends and close dialog
   *
   *  @author Jimmy
   */

  cancelNewChat = () => {
    this.setState({ selectedFriends: [] })
    return this.handleDialogClose()
  }

  /**
   *  Render name for a chat
   *
   *  @author Jimmy
   */

  renderChatName = (users) => {

    let index = users.indexOf(this.props.state.userInfo.username)
    if (index !== -1) users.splice(index, 1);
    let userString = users.join(', ')
    return userString.replace(/,(?=[^,]*$)/, ' &')
  }

  /**
   *  Render avatar for a chat
   *
   *  @author Jimmy
   */

  renderChatAvatar = (users) => {

    let avatars = []
    for (let i = 0; i < this.props.state.friends.length; i++) {
      for (let j = 0; j < users.length; j++) {

        if(users[j] !== this.props.state.userInfo.username) {
          if(users[j] === this.props.state.friends[i].username && this.props.state.friends[i].avatarUrl !== null) {
            avatars.push(this.props.state.friends[i].avatarUrl)
          }
        }

      }
    }
    if(avatars.length === 0) {
      return profilePhoto
    } else if (avatars.length === 1) {
      return avatars[0]
    } else if (avatars.length === 2) {

      return avatars[Math.floor(Math.random() * avatars.length)]
    }
  }


  /**
   *  Render list of chats
   *
   *  @author Jimmy
   */

  renderChatList () {
    let listArray = []

    for (let i = 0; i < this.state.groups.length; i++) {
      listArray.push(
        <Paper style={ChatListStyles.paper} elevation={1} key={this.state.groups[i].groupName}>
          <Avatar alt='Profile picture' src={this.renderChatAvatar(this.state.groups[i].members)}/>
          <Typography
            style={ChatListStyles.chatName}
            variant='subheading'
            color='primary'
            onClick={(() => {
              this.handleChatClick(this.state.groups[i].groupName)
              return this.handleChatDialogOpen()
            })}
          >
            {this.renderChatName(this.state.groups[i].members)}
          </Typography>
        </Paper>
      )
    }

    return listArray
  }

  /**
   *  Render list of chats. Large version. Screen sizes over 960px.
   *
   *  @author Jimmy
   */

  renderLargeChatList () {
    let listArray = []

    for (let i = 0; i < this.state.groups.length; i++) {
      listArray.push(
        <Paper style={ChatListStyles.paper}
          elevation={1}
          key={this.state.groups[i]}
        >
          <Avatar alt='Profile picture' src={this.renderChatAvatar(this.state.groups[i].members)}/>
          <Typography
            style={ChatListStyles.chatName}
            variant='subheading'
            color='primary'
            onClick={() => {
              this.handleChatClick(this.state.groups[i].groupName)
            }
            }
          >
            {this.renderChatName(this.state.groups[i].members)}
          </Typography>
        </Paper>
      )
    }

    return listArray
  }

  /**
   *  Get users friends and groups when component mounts.
   *
   *  @author Jimmy
   */

  componentDidMount () {
    this.props.state.signalRConnection.on('userAddedToGroup', (name, group) => {
      if (name === this.props.state.userInfo.username) {
        getGroups(this.props.state.token)
          .then((response) => {

            let tempArray = []
            for (let i = 0; i < response.data.groupList.length; i++) {
              getGroupInfo(this.props.state.token, response.data.groupList[i])
                .then((responseTwo) => {
                  tempArray.push(responseTwo.data)
                }).then(() => {
                if(i === response.data.groupList.length - 1) {
                  setTimeout(() => {
                    this.setState({
                      groups: tempArray,
                      isLoaded: true,
                      selectedFriends: []
                    })
                  }, 200)
                }
              })
            }
          })
          .catch(() => {
            return this.props.openSnackBar('Något gick fel. Försök igen!')
          })
      }
    })

    getFriends(this.props.state.token)
      .then((response) => {
        response.data.friendList.forEach((i) => {
          this.state.friends.push(i)
        })
      }).then(() => {
        getGroups(this.props.state.token)
          .then((response) => {

            let tempArray = []
            for (let i = 0; i < response.data.groupList.length; i++) {
              getGroupInfo(this.props.state.token, response.data.groupList[i])
                .then((responseTwo) => {
                  tempArray.push(responseTwo.data)
              }).then(() => {
                if(i === response.data.groupList.length - 1) {
                  setTimeout(() => {
                    this.setState({
                      groups: tempArray,
                      isLoaded: true,
                      selectedFriends: []
                    })
                  }, 200)
                }
              })
            }
          })
      }).catch(() => {
        return this.props.openSnackBar('Något gick fel. Försök igen!')
      })
  }

  componentWillUpdate() {

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
          <div className='ChatList'>
            <div className='ChatList-Header'>
              <Button color='primary' onClick={this.handleDialogOpen}>
                <Icon >add</Icon>
                  Starta ny chatt
              </Button>
            </div>
            <Hidden mdUp>
              <div className='ChatList-Inner'>
                {this.renderChatList()}
              </div>
            </Hidden>
            <Hidden smDown>
              <div className='ChatList-Inner-Large'>
                <div className='ChatList-Inner-Large-Menu'>
                  {this.renderLargeChatList()}
                </div>
                <div className='ChatList-Inner-Large-Content'>
                  {this.state.chatName ? (
                    <ChatView state={this.props.state}
                      chatContent={this.state.chatName}
                      updateComponent={this.updateComponent}
                      friends={this.state.friends}
                      openSnackBar={this.props.openSnackBar}
                    />
                  ) : (
                    <Typography
                    style={ChatListStyles.title}
                    >
                      Välj chatt!
                    </Typography>
                  )}
                </div>
              </div>
            </Hidden>
            <Dialog
              open={this.state.dialog}
              onClose={this.handleDialogClose}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
            >
              <DialogTitle id='alert-dialog-title'>{'Starta en ny chatt!'}</DialogTitle>
              <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                  Lägg till vänner som ska delta i chatten:
                </DialogContentText>
                <FormControl style={ChatListStyles.formControl}
                  fullWidth
                >
                  <InputLabel htmlFor='select-multiple-chip'>Namn</InputLabel>
                  <Select
                    multiple
                    value={this.state.selectedFriends}
                    onChange={this.handleFriendsSelect}
                    input={<Input id='select-multiple-chip' />}
                    renderValue={selected => (
                      <div style={ChatListStyles.formControl.chips}>
                        {selected.map(value => <Chip key={value} label={value} style={ChatListStyles.formControl.chip} />)}
                      </div>
                    )}
                  >
                    {this.state.friends.map(name => (
                      <MenuItem
                        key={name.username}
                        value={name.username}
                        style={{
                          fontWeight:
                            this.state.friends.indexOf(name.username) === -1
                              ? theme.typography.fontWeightRegular
                              : theme.typography.fontWeightMedium
                        }}
                      >
                        {name.username}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.cancelNewChat} color='primary'>
                  Ångra
                </Button>
                <Button onClick={this.createNewChat} color='primary' autoFocus>
                  Starta chatt
                </Button>
              </DialogActions>
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
                updateComponent={this.updateComponent}
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

export default ChatList
