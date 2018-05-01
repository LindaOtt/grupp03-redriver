import React, { Component } from 'react'

// Import NPM
import { CircularProgress } from 'material-ui/Progress'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'
import Typography from 'material-ui/Typography'

// Import styles. ChatViewStyles for all imported components with a style attribute and CSS-file for classNames and id.
import {ChatViewStyles} from '../../styles/ChatStyles'
import '../../styles/Styles.css'

import ChatMessage from './ChatMessage'

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
      newMessage: ''
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
  }

  componentWillReceiveProps (nextProps) {
    this.chatInit(nextProps.chatContent.messages)
  }

  render () {
    return (
      <div className='ChatView'>
        {this.state.loaded ? (
          <div className='ChatView'>
            <Typography variant='subheading'>Du chattar med {this.props.chatContent.name}</Typography>
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
      </div>

    )
  }
}

export default ChatView
