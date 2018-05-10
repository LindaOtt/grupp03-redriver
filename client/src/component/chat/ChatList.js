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

// Import Icons
import CloseIcon from '@material-ui/icons/Close'

// Import styles. ChatListStyles for all imported components with a style attribute and CSS-file for classNames and id.
import {ChatListStyles} from '../../styles/ChatStyles'
import '../../styles/Styles.css'
import {theme} from '../../styles/Styles'

import {getFriends, getGroups} from '../../utils/ApiRequests'
import {createChatGroup, createChatGroupWithUsers} from '../../utils/SignalR'
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
      isLoaded: false,
      dialog: false,
      chatDialog: false,
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
        this.setState({
          isLoaded: true,
          chatDialog: false,
          dialog: false,
          groups: response.data.groupList,
          chatName: ''
        })
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
    let groupArray = this.state.selectedFriends
    groupArray.push(this.props.state.userInfo.username)
    groupArray = groupArray.sort()
    let groupName = groupArray.toString()

    createChatGroupWithUsers(this.props.state.signalRConnection, groupName, groupArray)
      .then((response) => {
        return this.updateComponent()
      }).catch((err) => {
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
   *  Render list of chats
   *
   *  @author Jimmy
   */

  renderChatList () {
    let listArray = []

    for (let i = 0; i < this.state.groups.length; i++) {
      listArray.push(
        <Paper style={ChatListStyles.paper} elevation={1} key={this.state.groups[i]}>
          <Typography
            style={ChatListStyles.chatName}
            variant='headline'
            component='h3'
            onClick={(() => {
              this.handleChatClick(this.state.groups[i])
              return this.handleChatDialogOpen()
            })}
          >
            {this.state.groups[i]}
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
          <Typography
            style={ChatListStyles.chatName}
            variant='headline'
            component='h3'
            onClick={() => {
              this.handleChatClick(this.state.groups[i])}
            }
          >
            {this.state.groups[i]}
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
      getGroups(this.props.state.token)
        .then((response) => {
          console.log(response)
          this.setState({
            isLoaded: true,
            groups: response.data.groupList
          })
        })
        .catch((err) => {
          return this.props.openSnackBar('Något gick fel. Försök igen!')
        })
    })

    getFriends(this.props.state.token)
      .then((response) => {
        response.data.friendList.forEach((i) => {
          this.state.friends.push(i)
        })
      }).then(() => {
        getGroups(this.props.state.token)
          .then((response) => {
            this.setState({
              isLoaded: true,
              groups: response.data.groupList
            })
          })
      }).catch(() => {
        return this.props.openSnackBar('Något gick fel. Försök igen!')
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
                    <Typography>
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
                             fullWidth={true}
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

              <IconButton color='inherit' onClick={this.handleChatDialogClose} aria-label='Close'>
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
