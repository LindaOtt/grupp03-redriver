import React, { Component } from 'react'

// Import styles. settingsAdminStyles for all imported components with a style attribute and CSS-file for classNames and id.
import '../../styles/Styles.css'
import {videoCallStyles} from '../../styles/VideoCallStyles'
import {requestVideoCall} from '../../utils/SignalR'

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

    }
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

   componentWillMount() {

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
                    <p>Samtal till {this.state.userInfo.username}</p>
                  </div>
                ) : (
                  <div className='VideoCall'>
                    <p>Samtal från {this.state.userInfo.username}</p>
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
