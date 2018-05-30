import React, { Component } from 'react'

// Import NPM
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import moment from 'moment'
import 'moment/locale/sv'
import Divider from 'material-ui/Divider'

// Import styles. ChatMessageStyles for all imported components with a style attribute and CSS-file for classNames and id.
import {ChatMessageStyles} from '../../styles/ChatStyles'
import '../../styles/Styles.css'

// Profile picture
import profilePhoto from '../../img/user.jpg'

moment.locale('sv')

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

  /**
   *  Render users avatar
   *
   *  @author Jimmy
   */

  renderAvatar = () => {
    if (this.props.state.userInfo.avatarUrl) {
      return this.props.state.userInfo.avatarUrl
    } else {
      return profilePhoto
    }
  }

  /**
   *  Render friend avatars
   *
   *  @author Jimmy
   */

  renderFriendAvatar = () => {
    if (this.props.message.avatar) {
      return this.props.message.avatar
    } else {
      return profilePhoto
    }
  }

  /**
   *  Render chat messages. Render one type when the signed in user sends
   *  and one when receiving messages.
   *
   *  @author Jimmy
   */

  renderMessage () {
    if (this.props.message.name === this.props.state.userInfo.username) {
      return (
        <div className='ChatMessage-Self'>
          <div className='ChatBubble-Self'>
            <Avatar alt='Profile picture' src={this.renderAvatar()} style={ChatMessageStyles.avatar} />
            <div className='ChatBubble-Inside'>
              <Typography variant='caption' />
              <Typography variant='caption' style={{fontSize: '65%'}} >{moment(this.props.message.date).add(2, 'h').fromNow()}</Typography>
              <Divider/>
              <Typography style={{marginTop: 5,}} >{this.props.message.message}</Typography>
            </div>
          </div>
        </div>)
    } else {
      return (
        <div className='ChatMessage'>
          <div className='ChatBubble'>
            <Avatar alt='Profile picture' src={this.renderFriendAvatar()} style={ChatMessageStyles.avatar} />
            <div className='ChatBubble-Inside'>
              <Typography variant='caption' color='primary' style={{fontSize: '90%'}}>{this.props.message.name}</Typography>
              <Typography variant='caption' style={{fontSize: '65%'}} >{moment(this.props.message.date).add(2, 'h').fromNow()}</Typography>
              <Divider/>
              <Typography style={{marginTop: 5,}}>{this.props.message.message}</Typography>
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
