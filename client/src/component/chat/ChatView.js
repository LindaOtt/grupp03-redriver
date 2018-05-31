import React, { Component } from 'react'

// Import NPM
import { CircularProgress } from 'material-ui/Progress'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'
import Typography from 'material-ui/Typography'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog'
import IconButton from 'material-ui/IconButton'
import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { FormControl } from 'material-ui/Form'
import Select from 'material-ui/Select'
import Chip from 'material-ui/Chip'

// Import Icons
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

// Import styles. ChatViewStyles for all imported components with a style attribute and CSS-file for classNames and id.
import {ChatListStyles, ChatViewStyles} from '../../styles/ChatStyles'
import '../../styles/Styles.css'
import {theme} from '../../styles/Styles'

// Import components & utils
import ChatMessage from './ChatMessage'
import {addUserToChat, deleteUserFromChat, sendMessageToGroup} from '../../utils/SignalR'
import {getChatMessages} from '../../utils/ApiRequests'

/**
 *  ChatView-component. View for a single chat.
 *
 *  @author Jimmy
 */

class ChatView extends Component {
  constructor (props) {
    super(props)

    this.state = {
      messages: [],
      loaded: false,
      newMessage: '',
      deleteDialog: false,
      addDialog: false,
      selectedFriends: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  /**
   *  Handle form-input. Input are added to this.state.
   *
   *  @author Jimmy
   */

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  };

  /**
   *  Open and close dialogs for add or delete user in chat.
   *
   *  @author Jimmy
   */

  deleteDialogOpen = () => {
    this.setState({ deleteDialog: true })
  };

  deleteDialogClose = () => {
    this.setState({ deleteDialog: false })
  };

  addDialogOpen = () => {
    this.setState({ addDialog: true })
  };

  addDialogClose = () => {
    this.setState({ addDialog: false })
  };

  /**
   *  Handle add friends to chat.
   *
   *  @author Jimmy
   */

  handleFriendsSelect = event => {
    this.setState({ selectedFriends: event.target.value })
  }

  /**
   *  Add friend to chat
   *
   *  @author Jimmy
   */

  addUsersToChat = () => {
    for (let i = 0; i < this.state.selectedFriends.length; i++) {
      addUserToChat(this.props.state.signalRConnection, this.props.chatContent, this.state.selectedFriends[i])
        .catch(() => {
          return this.props.openSnackBar('Något gick fel. Försök igen!')
        })
    }

    return this.cancelAddUsersToChat()
  }

  /**
   *  Cancel new chat. Delete selected friends and close dialog
   *
   *  @author Jimmy
   */

  cancelAddUsersToChat = () => {
    this.setState({ selectedFriends: [] })
    return this.addDialogClose()
  }

  /**
   *  Delete user from chat group
   *
   *  @author Jimmy
   */

  deleteUser = () => {
    deleteUserFromChat(this.props.state.signalRConnection, this.props.chatContent)
      .then(() => {
        this.deleteDialogClose()
        return this.props.updateComponent()
      })
      .catch(() => {
        return this.props.openSnackBar('Något gick fel. Försök igen!')
      })
  };

  /**
   *  Handle submit-button. A login-request is sent to server with form-input included.
   *
   *  @author Jimmy
   */

  handleSubmit (e) {
    sendMessageToGroup(this.props.state.signalRConnection, this.props.chatContent, this.state.newMessage)
      .then(() => {
        this.setState({newMessage: ''})
        this.chatInit()
      })
      .catch(() => {
        return this.props.openSnackBar('Något gick fel. Försök igen!')
      })

    e.preventDefault()
  }

  /**
   *  Render chat messages
   *
   *  @author Jimmy
   */

  renderMessages () {
    let listArray = []
    let tempArray = this.state.messages

    tempArray.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })

    for (let i = 0; i < tempArray.length; i++) {
      listArray.push(
        <ChatMessage key={i} message={tempArray[i]} state={this.props.state} />
      )
    }

    return listArray
  }

  /**
   *  Get avatar for chatmessages.
   *
   *  @author Jimmy
   */

  getAvatar = (username) => {
    let avatar = null
    for (let i = 0; i < this.props.friends.length; i++) {
      if (this.props.friends[i].username === username) {
        avatar = this.props.friends[i].avatarUrl
      }
    }
    return avatar
  }

  /**
   *  Fetch messages from database
   *
   *  @author Jimmy
   */

  chatInit () {
    let tempArray = []
    this.setState({messages: []})
    getChatMessages(this.props.state.token, this.props.chatContent)
      .then((response) => {
        if (response.data.length >= 0) {
          for (let i = 0; i < response.data.length; i++) {
            let tempObj = {
              name: response.data[i].username,
              message: response.data[i].message,
              date: response.data[i].timeStamp,
              avatar: this.getAvatar(response.data[i].username)
            }

            tempArray.push(tempObj)
          }
          return this.setState({
            loaded: true,
            messages: tempArray
          })
        } else {
          return this.setState({
            loaded: true,
            messages: tempArray
          })
        }
      })
      .catch(() => {
        return this.props.openSnackBar('Något gick fel. Försök igen!')
      })
  }

  componentDidMount () {
    this.props.state.signalRConnection.on('messageSentToGroup', (group, senderName, message) => {
      this.chatInit()
    })

    this.chatInit()
  }

  render () {
    return (
      <div className='ChatView'>
        {this.state.loaded ? (
          <div className='ChatView'>
            <div className='ChatView-Header'>
              <Typography variant='subheading' />
              <div className='ChatView-Icons'>
                <IconButton color='primary' aria-label='Lägg till en vän' onClick={this.addDialogOpen}>
                  <AddIcon />
                </IconButton>
                <IconButton color='primary' aria-label='Lämna chatten' onClick={this.deleteDialogOpen}>
                  <RemoveIcon />
                </IconButton>
              </div>
            </div>
            <Divider />
            <div className='ChatView-Message-Div'>
              {this.renderMessages()}
            </div>
            <Divider />
            <form className='ChatView-Message-Input' onSubmit={this.handleSubmit}>
              <TextField
                id='full-width'
                placeholder='Skriv ett meddelande...'
                value={this.state.newMessage}
                onChange={this.handleChange('newMessage')}
                margin='normal'
                style={ChatViewStyles.textInput}
              />
              <Button variant='raised' color='primary' style={ChatViewStyles.button} onClick={this.handleSubmit}>
                Skicka
              </Button>
            </form>
          </div>
        ) : (
          <div className='AppLoadingDiv'>
            <CircularProgress />
          </div>
        )}
        <Dialog
          open={this.state.addDialog}
          onClose={this.addDialogClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{'Lägg till vänner!'}</DialogTitle>
          <DialogContent>
            <DialogContentText 
              id='alert-dialog-description'
              style={ChatListStyles.formControl.darkText}
            >
              Lägg till vänner som ska delta i chatten:
            </DialogContentText>
            <FormControl style={ChatListStyles.formControl}
              fullWidth
            >
              <InputLabel
                htmlFor='select-multiple-chip'
                style={ChatListStyles.formControl.darkText}
              >
              Namn</InputLabel>
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
                {this.props.friends.map(name => (
                  <MenuItem
                    key={name.username}
                    value={name.username}
                    style={{
                      fontWeight:
                        this.props.friends.indexOf(name.username) === -1
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
            <Button 
              onClick={this.cancelAddUsersToChat} 
              color='primary'
              style={ChatListStyles.formControl.boldText}
            >
              Ångra
            </Button>
            <Button 
              onClick={this.addUsersToChat}
              color='primary' 
              style={ChatListStyles.formControl.boldText}
              autoFocus
            >
              Lägg till
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.deleteDialog}
          onClose={this.deleteDialogClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{'Lämna chatten?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Klicka på OK ifall du vill lämna chatten.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.deleteDialogClose} color='primary'>
              Ångra
            </Button>
            <Button onClick={this.deleteUser} color='primary' autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>

    )
  }
}

export default ChatView
