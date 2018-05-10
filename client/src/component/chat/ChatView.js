import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

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
  DialogTitle,
} from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton'

// Import Icons
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

// Import styles. ChatViewStyles for all imported components with a style attribute and CSS-file for classNames and id.
import {ChatViewStyles} from '../../styles/ChatStyles'
import '../../styles/Styles.css'

import ChatMessage from './ChatMessage'
import {deleteUserFromChat} from '../../utils/SignalR'

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
      addDialog: false
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

    console.log(this.state.newMessage)
  };

  /**
   *  Open and close dialogs for add or delete user in chat.
   *
   *  @author Jimmy
   */

  deleteDialogOpen = () => {
    this.setState({ deleteDialog: true });
  };

  deleteDialogClose = () => {
    this.setState({ deleteDialog: false });
  };

  addDialogOpen = () => {
    this.setState({ addDialog: true });
  };

  addDialogClose = () => {
    this.setState({ addDialog: false });
  };

  /**
   *  Delete user from chat group
   *
   *  @author Jimmy
   */

  deleteUser = () => {
    deleteUserFromChat(this.props.state.signalRConnection, this.props.chatContent)
      .then((response) => {
        this.deleteDialogClose()
        return this.props.updateComponent()
      })
  };

  /**
   *  Handle submit-button. A login-request is sent to server with form-input included.
   *
   *  @author Jimmy
   */

  handleSubmit (e) {
    let tempMessage = {
      name: 'You',
      message: this.state.newMessage
    }

    this.state.messages.push(tempMessage)
    this.setState({newMessage: ''})

    e.preventDefault()
  }

  /**
   *  Render chat messages
   *
   *  @author Jimmy
   */

  renderMessages () {
    let listArray = []

    for (let i = 0; i < this.state.messages.length; i++) {
      listArray.unshift(
        <ChatMessage key={i} message={this.state.messages[i]} />
      )
    }

    return listArray
  }

  chatInit (messages) {
    let tempArray = []
    this.setState({messages: []})
    for (let key in messages) {
      let tempObj = {
        name: key,
        message: messages[key]
      }

      tempArray.push(tempObj)
    }
    return this.setState({
      loaded: true,
      messages: tempArray
    })
  }

  componentDidMount () {
    this.chatInit(this.props.chatContent.messages)
    console.log(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.chatInit(nextProps.chatContent.messages)
  }

  render () {
    return (
      <div className='ChatView'>
        {this.state.loaded ? (
          <div className='ChatView'>
            <div className='ChatView-Header'>
              <Typography variant='subheading'>Du chattar med {this.props.chatContent.name}</Typography>
              <div className='ChatView-Icons'>
                <IconButton color='inherit' aria-label='Lägg till en vän'>
                  <AddIcon />
                </IconButton>
                <IconButton color='inherit' aria-label='Lämna chatten' onClick={this.deleteDialogOpen}>
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
              <Button variant='raised' style={ChatViewStyles.button} onClick={this.handleSubmit}>
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
          open={this.state.deleteDialog}
          onClose={this.deleteDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Lämna chatten?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Klicka på OK ifall du vill lämna chatten.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.deleteDialogClose} color="primary">
              Ångra
            </Button>
            <Button onClick={this.deleteUser} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>

    )
  }
}

export default ChatView
