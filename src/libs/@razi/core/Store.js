import PubSub from './PubSub'

export default class Store {
  constructor (params) {
    this.actions = params.actions || {}
    this.mutations = params.mutations || {}
    this.status = 'idle'
    this.events = new PubSub()

    this.state = new Proxy(params.state || {}, {
      set: function (state, key, value) {
        state[key] = value

        this.events.publish('stateChange', this.state)

        if (this.status !== 'mutation') {
          console.warn(`You should use a mutation to set ${key}`) // inform the develper to use mutation
        }

        this.status = 'idle'

        return true
      }
    })
  }

  dispatch (actionKey, payload) {
    if (typeof this.actions[actionKey] !== 'function') {
      console.error(`Action "${actionKey} doesn't exist.`)
      return false
    }

    console.groupCollapsed(`ACTION: ${actionKey}`)

    this.status = 'action'

    this.actions[actionKey](this, payload)

    console.groupEnd()

    return true
  }

  commit (mutationKey, payload) {
    if (typeof this.mutations[mutationKey] !== 'function') {
      console.log(`Mutation "${mutationKey}" doesn't exist`)
      return false
    }

    this.status = 'mutation'

    const newState = this.mutations[mutationKey](this.state, payload)

    this.state = Object.assign(this.state, newState)

    return true
  }
}
