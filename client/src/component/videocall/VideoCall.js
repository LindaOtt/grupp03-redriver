import React, { Component } from 'react'

import PeerConnection from './PeerConnection'
import VideoStream from './VideoStream'

// Import npm-modules
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import _ from 'lodash'

// Import Icons
import EndCall from '@material-ui/icons/CallEnd'
import MicOn from '@material-ui/icons/Mic'
import MicOff from '@material-ui/icons/MicOff'
import CameraOn from '@material-ui/icons/Videocam'
import CameraOff from '@material-ui/icons/VideocamOff'

// Import styles. videoCallStyles for all imported components with a style attribute and CSS-file for classNames and id.
import '../../styles/Styles.css'
import {videoCallStyles} from '../../styles/VideoCallStyles'
import {endVideoCall} from '../../utils/SignalR'

// Profile picture
import profilePhoto from '../../temp/user.jpg'
import {userAccountStyles} from '../../styles/AccountStyles'

/**
 *  Video call-component.
 *
 *  @author Jimmy
 */

class VideoCall extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loaded: false,
      localSrc: null,
      peerSrc: null,
      Video: true,
      Audio: true

    }

    this.pc = {}
    this.config = null
    this.startCall = this.startCall.bind(this)
    this.endCall = this.endCall.bind(this)
    this.rejectCall = this.rejectCall.bind(this)
  }

  /**
   *  Render image tag for profile picture. A default picture renders if image url is null.
   *
   *  @author Jimmy
   */

  renderAvatar () {
    if (this.state.userInfo.avatarUrl) {
      return <img onError={this.onImageError} className='VideoCall-Avatar' src={this.state.userInfo.avatarUrl} />
    } else {
      return <img onError={this.onImageError} className='VideoCall-Avatar' src={profilePhoto} />
    }
  }

  onImageError (ev) {
    ev.target.src = profilePhoto
  }

  /**
   *  Start a video call
   *
   *  @author Jimmy
   */

   startVideoCall = (name) => {
     let userObj

     for (let i = 0; i < this.props.state.friends.length; i++) {
       if (this.props.callTo === this.props.state.friends[i].username) {
         userObj = this.props.state.friends[i]
       }
     }

     return this.setState({
       makeCall: true,
       userInfo: userObj,
       isCaller: true
     }, () => {
       const config = {audio: true, video: true}
       this.setState({Audio: true, Video: true})
       this.startCall(true, this.state.userInfo.username, config)
     })
   };

  /**
   *  Answer a video call
   *
   *  @author Jimmy
   */

  answerVideoCall = (name) => {
    let userObj

    for (let i = 0; i < this.props.state.friends.length; i++) {
      if (this.props.callFrom === this.props.state.friends[i].username) {
        userObj = this.props.state.friends[i]
      }
    }

    return this.setState({
      makeCall: false,
      userInfo: userObj,
      isCaller: false
    })
  };

  startCall (isCaller, friendID, config) {
    this.config = config

    console.log(this.state)
    this.pc = new PeerConnection(friendID, this.props.state.signalRConnection)
      .on('localStream', (src) => {
        const newState = {localSrc: src, isCaller: isCaller }
        this.setState(newState)
      })
      .on('peerStream', src => this.setState({ peerSrc: src }))
      .start(isCaller, config)
  }

  endCall (isStarter) {
    if (_.isFunction(this.pc.stop)) this.pc.stop(isStarter)
    this.pc = {}
    this.config = null
    this.props.videoCallClose()
  }

  rejectCall () {
    this.props.state.signalRConnection.invoke('endVideoCall', this.props.callFrom)
    this.props.videoCallClose()
  }

  acceptWithVideo (video) {
    const config = { audio: true, video }
    return () => this.startCall(false, this.props.callFrom, config)
  }

  toggleMediaDevice (deviceType) {
    this.setState({
      [deviceType]: !this.state[deviceType]
    })
    this.pc.mediaDevice.toggle(deviceType)
  }

  componentWillMount () {
    this.props.state.signalRConnection.on('createVideoCall', (sender, data) => {
      if (data !== null) {
        if (data.sdp) {
          this.pc.setRemoteDescription(data)
          if (data.type === 'offer') this.pc.createAnswer()
        } else this.pc.addIceCandidate(data)
      }
    })

    this.props.state.signalRConnection.on('endVideoCall', this.endCall.bind(this, false))

    if (this.props.callTo !== '') {
      this.startVideoCall(this.props.callTo)
    } else if (this.props.callFrom !== '') {
      this.answerVideoCall(this.props.callFrom)
    } else {
      this.props.videoCallClose()
    }
  }

  render () {
    return (
      <div className='VideoCall'>
        {this.state.userInfo ? (
          <div className='VideoCall'>
            {this.state.peerSrc ? (
              <div className='VideoCall'>
                <VideoStream localSrc={this.state.localSrc}
                  peerSrc={this.state.peerSrc}
                  config={this.config}
                  mediaDevice={this.pc.mediaDevice}
                />
                <div className='VideoCall-ButtonDiv'>
                  {this.state.Video ? (
                    <Button variant='fab' color='primary' aria-label='end call' onClick={() => this.toggleMediaDevice('Video')} style={videoCallStyles.button}>
                      <CameraOn />
                    </Button>
                  ) : (
                    <Button variant='fab' color='primary' aria-label='end call' onClick={() => this.toggleMediaDevice('Video')} style={videoCallStyles.button}>
                      <CameraOff />
                    </Button>
                  )}
                  {this.state.Audio ? (
                    <Button variant='fab' color='primary' aria-label='end call' onClick={() => this.toggleMediaDevice('Audio')} style={videoCallStyles.button}>
                      <MicOn />
                    </Button>
                  ) : (
                    <Button variant='fab' color='primary' aria-label='end call' onClick={() => this.toggleMediaDevice('Audio')} style={videoCallStyles.button}>
                      <MicOff />
                    </Button>
                  )}
                  <Button variant='fab' color='secondary' aria-label='end call' onClick={() => this.endCall(this.state.isCaller)} style={videoCallStyles.button}>
                    <EndCall />
                  </Button>
                </div>
              </div>
            ) : (
              <div className='VideoCall'>
                {this.state.makeCall ? (
                  <div className='VideoCall'>
                    <Typography
                      variant='headline'
                      color='textSecondary'
                      align='left'
                      style={userAccountStyles.title}
                    >
                      Samtal till {this.state.userInfo.username}
                    </Typography>
                    {this.renderAvatar()}
                    <div className='VideoCall-ButtonDiv'>
                      <Button variant='fab' color='secondary' aria-label='end call' onClick={() => this.endCall(this.state.isCaller)} style={videoCallStyles.button}>
                        <EndCall />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className='VideoCall'>
                    <Typography
                      variant='headline'
                      color='textSecondary'
                      align='left'
                      style={userAccountStyles.title}
                    >
                      Samtal från {this.state.userInfo.username}
                    </Typography>
                    {this.renderAvatar()}
                    <div className='VideoCall-ButtonDiv'>
                      <Button variant='fab' color='primary' aria-label='end call' onClick={this.acceptWithVideo(true)} style={videoCallStyles.button}>
                        <CameraOn />
                      </Button>
                      <Button variant='fab' color='primary' aria-label='end call' onClick={this.acceptWithVideo(false)} style={videoCallStyles.button}>
                        <MicOn />
                      </Button>
                      <Button variant='fab' color='secondary' aria-label='end call' onClick={this.rejectCall} style={videoCallStyles.button}>
                        <EndCall />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <p />
        )}

      </div>
    )
  }
}

export default VideoCall
