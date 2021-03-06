import React, { Component } from 'react'
import _ from 'lodash'

// Import styles
import '../../styles/Styles.css'

/**
 *  Component used to show the connected peers video streams
 *
 *  @author Jimmy
 */

class VideoStream extends Component {
  constructor (props) {
    super(props)
    this.state = {
      Video: true,
      Audio: true
    }
  }

  componentDidMount () {
    this.setMediaStream()
  }

  componentWillReceiveProps (nextProps) {
    // Initialize when the call started
    if (!this.props.config && nextProps.config) {
      const { config, mediaDevice } = nextProps
      _.forEach(config, (conf, type) =>
        mediaDevice.toggle(_.capitalize(type), conf))

      this.setState({
        Video: config.video,
        Audio: config.audio
      })
    }
  }

  componentDidUpdate () {
    this.setMediaStream()
  }

  setMediaStream () {
    const { peerSrc, localSrc } = this.props
    if (this.peerVideo && peerSrc) this.peerVideo.srcObject = peerSrc
    if (this.localVideo && localSrc) this.localVideo.srcObject = localSrc
  }

  render () {
    return (
      <div className='VideoContainer'>
        <video id='localVideo' ref={el => this.localVideo = el} autoPlay muted />
        <video id='peerVideo' ref={el => this.peerVideo = el} autoPlay playsInline  />
      </div>
    )
  }
}

export default VideoStream
