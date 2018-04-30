import React, { Component } from 'react'

// Import styles. ChatMessageStyles for all imported components with a style attribute and CSS-file for classNames and id.
import {ChatMessageStyles} from '../../styles/ChatStyles'
import '../../styles/Styles.css'

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

  renderMessage() {
    if (this.props.message.name === 'You') {
      return (
        <div className='ChatMessage-Self'>
          <p>{this.props.message.message}</p>
        </div>)
    } else {
      return (
        <div className='ChatMessage'>
          <p>{this.props.message.message}</p>
        </div>)
    }
  }

  render () {
    return this.renderMessage()
  }
}

export default ChatMessage
