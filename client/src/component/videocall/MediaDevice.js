import _ from 'lodash'
import Emitter from './Emitter'

/**
 *  Handles media events for video calls
 *
 *  @author Jimmy
 */

class MediaDevice extends Emitter {

  /**
   *  Start media devices and send stream
   *
   *  @author Jimmy
   */

  start () {
    const constraints = {
      video: {
        facingMode: 'user',
        height: { min: 360, ideal: 720, max: 1080 }
      },
      audio: true
    }

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        this.stream = stream
        this.emit('stream', stream)
      })
      .catch(err => console.log(err))

    return this
  }

  /**
   *  Turn on/off a device
   *
   *  @author Jimmy
   */

  toggle (type, on) {
    const len = arguments.length
    if (this.stream) {
      this.stream[`get${type}Tracks`]().forEach((track) => {
        const state = len === 2 ? on : !track.enabled
        _.set(track, 'enabled', state)
      })
    }
    return this
  }

  /**
   *  Stop all media track of devices
   *
   *  @author Jimmy
   */

  stop () {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop())
    }
    return this
  }
}

export default MediaDevice
