import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

// Import styles. ChatListStyles for all imported components with a style attribute and CSS-file for classNames and id.
//import {ChatListStyles} from '../../styles/ChatStyles'
import '../../styles/Styles.css'

/**
 *  ChatList-component. Starting page of chat.
 *
 *  @author Jimmy
 */

class ChatList extends Component {
  render () {
    if (this.props.state.isSignedIn === false) {
      return <Redirect to='/login' />
    }

    return (
      <div className='ChatList'>
        <p>Chat list</p>
      </div>

    )
  }
}

export default ChatList
