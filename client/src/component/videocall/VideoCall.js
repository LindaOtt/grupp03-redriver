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

    }
  }

  /**
   *  Start a video call
   *
   *  @author Jimmy
   */

   startVideoCall = (name) => {
     requestVideoCall(this.props.state.signalRConnection, name)
       .then((response) => {
         console.log(response)
       })
       .catch(() => {
         this.props.closeDialog()
         return this.props.openSnackBar('Något gick fel. Försök igen!')
       })
   };

   componentDidMount() {
     this.startVideoCall(this.props.callTo)
   }
  render () {
    return (
      <div className='VideoCall'>
        <p>Video call</p>
      </div>
    )
  }
}

export default VideoCall
