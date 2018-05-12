import React, { Component } from 'react'

// Import npm-modules
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button';
import _ from 'lodash';

// Import Icons
import EndCall from '@material-ui/icons/CallEnd';

// Import styles. videoCallStyles for all imported components with a style attribute and CSS-file for classNames and id.
import '../../styles/Styles.css'
import {videoCallStyles} from '../../styles/VideoCallStyles'
import {endVideoCall, requestVideoCall} from '../../utils/SignalR'

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

    }

    this.pc = {};
    this.config = null;
    this.startCall = this.startCall.bind(this);
    this.endCall = this.endCall.bind(this);
    this.rejectCall = this.rejectCall.bind(this);
  }

  /**
   *  Render image tag for profile picture. A default picture renders if image url is null.
   *
   *  @author Jimmy
   */

  renderAvatar () {
    if (this.state.userInfo.avatarUrl) {
      return <img onError={this.onImageError} className='VideoCall-Avatar' src={this.state.userInfo.avatarUrl}/>
    } else {
      return <img onError={this.onImageError} className='VideoCall-Avatar' src={profilePhoto}/>
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
     let userObj;

     for (let i = 0; i < this.props.state.friends.length; i++) {
       if (this.props.callTo === this.props.state.friends[i].username) {
         userObj = this.props.state.friends[i]
       }
     }
     requestVideoCall(this.props.state.signalRConnection, name)
       .then((response) => {
         return this.setState({
           makeCall: true,
           userInfo: userObj
         })
       })
       .catch(() => {
         this.props.videoCallClose()
         return this.props.openSnackBar('Något gick fel. Försök igen!')
       })
   };

  /**
   *  Answer a video call
   *
   *  @author Jimmy
   */

  answerVideoCall = (name) => {
    let userObj;

    for (let i = 0; i < this.props.state.friends.length; i++) {
      if (this.props.callFrom === this.props.state.friends[i].username) {
        userObj = this.props.state.friends[i]
      }
    }
    return this.setState({
      makeCall: false,
      userInfo: userObj
    })
  };

  /**
   *  End a video call
   *
   *  @author Jimmy
   */

  closeVideoCall = () => {

    endVideoCall(this.props.state.signalRConnection, this.state.userInfo.username)
      .then(() => {
        this.props.videoCallClose()
      })
      .catch(() => {
        this.props.videoCallClose()
        return this.props.openSnackBar('Något gick fel. Försök igen!')
      })
  };

  callWithVideo(video, friendID) {
    const config = {audio: true};
    config.video = video;
    return () => this.startCall(true, friendID, config);
  }

  startCall(isCaller, friendID, config) {
    this.config = config;

    console.log(friendID);
    console.log(config);

    this.pc = new PeerConnection(friendID, userConnection)
      .on('localStream', (src) => {
        const newState = { callWindow: true, localSrc: src };
        if (!isCaller) newState.callModal = false;
        this.setState(newState);
      })
      .on('peerStream', src => this.setState({ peerSrc: src }))
      .start(isCaller, config);
  }

  endCall(isStarter) {

    console.log(isStarter);

    if (_.isFunction(this.pc.stop)) this.pc.stop(isStarter);
    this.pc = {};
    this.config = null;
    this.setState({
      callWindow: false,
      localSrc: null,
      peerSrc: null
    });
  }

  componentWillMount() {

     this.props.state.signalRConnection.on('endVideoCall', (name) => {
       this.props.videoCallClose()
     })

     if(this.props.callTo !== '') {
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
            {this.state.loaded ? (
              <div className='VideoCall'>
                <p>Samtal</p>
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
                      <Button variant="fab" color="secondary" aria-label="end call" onClick={this.closeVideoCall}>
                        <EndCall/>
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
                      <Button variant="fab" color="secondary" aria-label="end call" onClick={this.closeVideoCall}>
                        <EndCall/>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <p> </p>
        )}

      </div>
    )
  }
}

export default VideoCall
