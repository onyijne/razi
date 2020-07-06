import Store from './Store.js'

/**
 * this is the base class for all components : WIP
 */
export default class Component {
  constructor (props = {}) {
    this.components = props.components || []

    this.store = props.store || null

    this.id = props.id || 'application-base-component'

    this.name = props.name || 'application-base-component'

    this.element = props.element || ''
    this.methods = props.methods || {}
    /** functions that should be called at certain life circles */
    this.onInit = props.onInit || function () {}
    this.onDomReady = props.onDomReady || function () {}
    this.beforeMount = props.beforeMount || function () {} // handler to execute before mounting to DOM
    this.afterMount = props.afterMount || function () {} // handler to execute after mounting to DOM

    this.render = props.render || function (ele, parent = { id: '', isBase: true }) {
      const app = document.getElementById(parent.id)
      if (parent.isBase) app.innerHTML = ''
      app.appendChild(ele)
    }
  }

  /**
   *
   * @param {String} event The event name to look out for
   * @param {Callable} callback The function to run whenever the event is published
   */
  async subscribe (event, callback) {
    if ((!this.store) instanceof Store) return console.warn(`${this.store} should be an instance on ${Store.name}`)
    return this.store.events.subscribe(event, callback)
  }

  /**
   *
   * @param {String} event The event subscribers can listen to
   * @param {String|Object|Array|Number} data The data to pass as an
   * argument to the function assigned the any subscriber
   */
  async publish (event, data = {}) {
    if ((!this.store) instanceof Store) return console.warn(`${this.store} should be an instance on ${Store.name}`)
    return this.store.events.publish(event, data)
  }

  /**
   *
   * @param {String} event The event name to unscribe from
   */
  async unSubscribe (event) {
    if ((!this.store) instanceof Store) return console.warn(`${this.store} should be an instance on ${Store.name}`)
    return this.store.events.unSubscribe(event)
  }
}
