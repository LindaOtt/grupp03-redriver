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
import Divider from 'material-ui/Divider'
import moment from 'moment'
import 'moment/locale/sv'
import _ from 'lodash'

// Import Icons
import CloseIcon from '@material-ui/icons/Close'

// Import styles. ChatListStyles for all imported components with a style attribute and CSS-file for classNames and id.
import {ChatListStyles} from '../../styles/ChatStyles'
import '../../styles/Styles.css'
import {theme} from '../../styles/Styles'

// Profile picture
import profilePhoto from '../../temp/user.jpg'

import {getChatMessages, getFriends, getGroupInfo, getGroups} from '../../utils/ApiRequests'
import {createChatGroupWithUsers} from '../../utils/SignalR'
import ChatView from './ChatView'

moment.locale('sv')

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
    this.setState({
      isLoaded: false,
    })
    this.getGroupsAndMembers()
  }

  /**
   *  Set friends name to view info.
   *
   *  @author Jimmy
   */

  handleChatClick (name) {
    this.setState({
      chatName: name,
      chatLoaded: false,
    }, () => {
      this.setState({
        chatLoaded: true,
      })
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
    console.log('Create chat init')
    this.setState({
      isLoaded: false,
      chatDialog: false,
      dialog: false,
    })
    let completedRequests = 0;
    let groupArray = this.state.selectedFriends

    if (!_.includes(groupArray, this.props.state.userInfo.username)) {
      console.log('Add user')
      groupArray.push(this.props.state.userInfo.username)
    }

    getGroups(this.props.state.token)
      .then((response) => {
        if(response.data.groupList.length < 1) {
          createChatGroupWithUsers(this.props.state.signalRConnection, groupArray)
            .then((response) => {
              this.createNewChat()
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
                    console.log('Create new group')
                    createChatGroupWithUsers(this.props.state.signalRConnection, groupArray)
                      .then((response) => {
                        this.createNewChat()
                      })
                  } else {
                    console.log('Group exists')
                    console.log(this.state)
                    this.setState({
                      chatName: tempName,
                      chatDialog: true,
                      dialog: false,
                      isLoaded: true,
                      selectedFriends: []
                    })
                  }
                }
              })
          }
        }
      }).catch(() => {
      console.log('Create chat error')
      this.setState({
        chatName: '',
        chatDialog: false,
        isLoaded: true
      })
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

  renderTime = (data) => {
    if (data.timeStamp !== 0) {
      return moment(data.timeStamp).add(2, 'h').calendar()
    }
    return ''
}

  renderLastMessage = (data) => {
    if (data.timeStamp !== 0) {
      return data.username + ': ' + data.message
    }
    return 'Inga meddelanden...'
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
        <Paper style={ChatListStyles.paper} elevation={1} key={this.state.groups[i].groupName}
               onClick={(() => {
                 this.handleChatClick(this.state.groups[i].groupName)
                 return this.handleChatDialogOpen()
               })}
        >
          <div className='ChatList-Paper'>
            <div className='ChatList-Paper-Avatar'>
              <Avatar alt='Profile picture' src={this.renderChatAvatar(this.state.groups[i].members)}/>
              <Typography
                style={ChatListStyles.chatDate}
                variant='caption'
                color='primary'
              >
                {this.renderTime(this.state.groups[i].lastMessage)}
              </Typography>
            </div>
            <div className='ChatList-Paper-Inner'>
              <Typography
                style={ChatListStyles.chatName}
                color='primary'
              >
                {this.renderChatName(this.state.groups[i].members)}
              </Typography>
              <Typography
                style={ChatListStyles.chatMessage}
                variant='caption'
              >
                {this.renderLastMessage(this.state.groups[i].lastMessage)}
              </Typography>
            </div>
          </div>

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
        <Paper style={ChatListStyles.paper} elevation={1} key={this.state.groups[i].groupName}
               onClick={(() => {
                 this.handleChatClick(this.state.groups[i].groupName)
               })}
        >
          <div className='ChatList-Paper'>
            <div className='ChatList-Paper-Avatar'>
              <Avatar alt='Profile picture' src={this.renderChatAvatar(this.state.groups[i].members)}/>
              <Typography
                style={ChatListStyles.chatDate}
                variant='caption'
                color='primary'
              >
                {this.renderTime(this.state.groups[i].lastMessage)}
              </Typography>
            </div>
            <div className='ChatList-Paper-Inner'>
              <Typography
                style={ChatListStyles.chatName}
                color='primary'
              >
                {this.renderChatName(this.state.groups[i].members)}
              </Typography>
              <Typography
                style={ChatListStyles.chatMessage}
                variant='caption'
              >
                {this.renderLastMessage(this.state.groups[i].lastMessage)}
              </Typography>
            </div>
          </div>

        </Paper>
      )
    }

    return listArray
  }

  /**
   *  Method to catch users groups and info about them.
   *
   *  @author Jimmy
   */

  getGroupsAndMembers() {
    getGroups(this.props.state.token)
      .then((response) => {
        if(response.data.groupList.length < 1) {
          this.setState({
            groups: [],
            isLoaded: true,
            selectedFriends: [],
            chatDialog: false,
            dialog: false,
            chatName: null
          })
        } else {
          let tempArray = []
          for (let i = 0; i < response.data.groupList.length; i++) {
            getGroupInfo(this.props.state.token, response.data.groupList[i])
              .then((responseTwo) => {
                if (responseTwo.data.members.length > 1) {
                  getChatMessages(this.props.state.token, response.data.groupList[i])
                    .then((responseThree) => {
                      let tempGroup = responseTwo.data
                      tempGroup.messages = responseThree.data
                      tempGroup.lastMessage = responseThree.data.sort(function(a,b) {
                        return new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime()
                      })[0];

                      if (!tempGroup.lastMessage) {
                        tempGroup.lastMessage = {
                          timeStamp: 0
                        }
                      }

                      tempArray.push(tempGroup)
                    })
                    .then(() => {
                      if(i === response.data.groupList.length - 1) {
                        setTimeout(() => {
                          tempArray.sort(function(a,b){
                            return new Date(b.lastMessage.timeStamp) - new Date(a.lastMessage.timeStamp);
                          });
                          this.setState({
                            groups: tempArray,
                            isLoaded: true,
                            selectedFriends: [],
                            chatDialog: false,
                            dialog: false,
                            chatName: null
                          })
                        }, 200)
                      }
                  })
                }
              })
          }
        }
      }).catch(() => {
      return this.props.openSnackBar('Något gick fel. Försök igen!')
    })
  }

  /**
   *  Get users friends and groups when component mounts.
   *
   *  @author Jimmy
   */

  componentDidMount () {
    this.props.state.signalRConnection.on('userAddedToGroup', (name, group) => {
      if (name === this.props.state.userInfo.username) {
        this.getGroupsAndMembers()
      }
    })

    getFriends(this.props.state.token)
      .then((response) => {
        response.data.friendList.forEach((i) => {
          this.state.friends.push(i)
        })
      }).then(() => {
        this.getGroupsAndMembers()
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
          <div className='ChatList'>
            <div className='ChatList-Header'>
              <Button color='primary' onClick={this.handleDialogOpen}>
                <Icon >add</Icon>
                  Starta ny chatt
              </Button>
            </div>
            {this.state.groups.length > 0 ? (
              <div>
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
                        <div className='ChatList-Inner-Large-Content-Chat'>
                          {this.state.chatLoaded ? (
                            <ChatView state={this.props.state}
                                      chatContent={this.state.chatName}
                                      updateComponent={this.updateComponent}
                                      friends={this.state.friends}
                                      openSnackBar={this.props.openSnackBar}
                            />
                          ) : (
                            <div className='AppLoadingDiv'>
                              <CircularProgress />
                            </div>
                          )}
                        </div>

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
              </div>
            ) : (
              <div>
                <Typography
                  style={ChatListStyles.title}
                >
                  Inga aktiva chattar!
                </Typography>
              </div>
            )}
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
