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
import profilePhoto from '../../temp/user.jpg'

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

  renderAvatar = () => {
    if (this.props.state.userInfo.avatarUrl) {
      return this.props.state.userInfo.avatarUrl
    } else {
      return profilePhoto
    }
  }

  renderFriendAvatar = () => {
    if (this.props.message.avatar) {
      return this.props.message.avatar
    } else {
      return profilePhoto
    }
  }

  renderMessage () {
    if (this.props.message.name === this.props.state.userInfo.username) {
      return (
        <div className='ChatMessage-Self'>
          <div className='ChatBubble-Self'>
            <Avatar alt='Profile picture' src={this.renderAvatar()} style={ChatMessageStyles.avatar} />
            <div className='ChatBubble-Inside'>
              <Typography variant='caption' />
              <Typography variant='caption' style={{fontSize: '70%'}} >{moment(this.props.message.date).fromNow()}</Typography>
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
              <Typography variant='caption' color='primary'>{this.props.message.name}</Typography>
              <Typography variant='caption' style={{fontSize: '70%'}} >{moment(this.props.message.date).fromNow()}</Typography>
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
