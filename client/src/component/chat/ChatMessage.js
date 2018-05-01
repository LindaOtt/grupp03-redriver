import React, { Component } from 'react'

// Import NPM
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'

// Import styles. ChatMessageStyles for all imported components with a style attribute and CSS-file for classNames and id.
import {ChatMessageStyles} from '../../styles/ChatStyles'
import '../../styles/Styles.css'

// Profile picture
import profilePhoto from '../../temp/user.jpg'

/**
 *  Message-component.
 *
 *  @author Jimmy
 */

class ChatMessage extends Component {
  constructor (props) {
    super(props)

    this.state = {
    }
  }

  renderMessage () {
    if (this.props.message.name === 'You') {
      return (
        <div className='ChatMessage-Self'>
          <div className='ChatBubble-Self'>
            <Avatar alt='Profile picture' src={profilePhoto} style={ChatMessageStyles.avatar} />
            <div className='ChatBubble-inside'>
              <Typography>{this.props.message.message}</Typography>
            </div>
          </div>
        </div>)
    } else {
      return (
        <div className='ChatMessage'>
          <div className='ChatBubble'>
            <Avatar alt='Profile picture' src={profilePhoto} style={ChatMessageStyles.avatar} />
            <div className='ChatBubble-inside'>
              <Typography variant='caption'>{this.props.message.name}</Typography>
              <Typography >{this.props.message.message}</Typography>
            </div>
          </div>
        </div>)
    }
  }

  render () {
    return this.renderMessage()
  }
}

export default ChatMessage
