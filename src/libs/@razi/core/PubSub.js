import { forIn } from 'lodash'

/* eslint-disable no-prototype-builtins */
export default class PubSub {
  constructor () {
    this.events = {}
  }

  subscribe (event, callback) {
    const self = this
    if (!self.events.hasOwnProperty(event)) {
      self.events[event] = []
    }
    return self.events[event].push(callback)
  }

  publish (event, data = {}) {
    const self = this
    if (!self.events.hasOwnProperty(event)) {
      return []
    }
    return self.events[event].map(callback => callback(data))
  }

  unSubscribe (event) {
    const self = this
    for (const idx in self.events) {
      console.log(idx)
      if (self.events[idx] !== event) continue
    }
  }
}
