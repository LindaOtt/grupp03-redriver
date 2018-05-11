import React, { Component } from 'react'

// Import styles. settingsAdminStyles for all imported components with a style attribute and CSS-file for classNames and id.
import '../../../styles/Styles.css'
import {videoCallStyles} from '../../styles/VideoCallStyles'

/**
 *  Video call-component.
 *
 *  @author Jimmy
 */

class VideoCall extends Component {
  render () {
    return (
      <div className='VideoCall'>
        <p>Video call</p>
      </div>
    )
  }
}

export default VideoCall
