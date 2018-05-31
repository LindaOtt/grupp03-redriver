// Import npm-modules
import _ from 'lodash'

class Emitter {
  constructor () {
    this.events = {}
  }

  /**
   *  Emit events for video call
   *
   *  @author Jimmy
   */

  emit (event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(fn => fn(...args))
    }
    return this
  }

  /**
   *  Activate event listener for video calls
   *
   *  @author Jimmy
   */

  on (event, fn) {
    if (this.events[event]) this.events[event].push(fn)
    else this.events[event] = [fn]
    return this
  }

  /**
   *  Deactivate event listener for video calls
   *
   *  @author Jimmy
   */

  off (event, fn) {
    if (event && _.isFunction(fn)) {
      const listeners = this.events[event]
      const index = listeners.findIndex(_fn => _fn === fn)
      listeners.splice(index, 1)
    } else this.events[event] = []
    return this
  }
}

export default Emitter
