/* eslint-disable no-prototype-builtins */
import Component from './Component'
import Store from './Store'
import RazRouter from '../router'
import RazDom from './Dom'

export default class Razi extends Component {
  constructor (params) {
    super({
      store: Store,
      element: document.getElementById('app') // set the default app dom base
    })

    this.$dom = ''
    this.$router = ''
    this.id = 'app' // default app dom id
    if (params.hasOwnProperty('store')) {
      if (params.store instanceof Store) {
        this.store = params.store
      }
    }
    if (params.hasOwnProperty('ele')) {
      this.element = new RazDom({}).nodeById(params.ele) || this.element
      this.id = params.ele
    }
    if (params.hasOwnProperty('router')) {
      if (params.router instanceof RazRouter) {
        this.$router = params.router // set the router
      }
    }
  }

  async init (dom) {
    this.$dom = dom
    window.Razi = this
    this.$router.assignRoute(this)
    await new RazDom({}).setMeta(this.$dom.querySelector('head'), {
      name: 'author',
      content: 'Samuel Onyijne'
    }) // for test only
  }

  async run () {
    document.addEventListener('DOMContentLoaded', async e => {
      await this.init(e.target)
      this.$router.start()
    })
  }

  async setPage (route) {
    route.component.store = this.store
    const dom = new RazDom(route.component)
    const page = await dom.mount(await dom.makeDomReady())
    await this.buildComponents(page)
  }

  async buildComponents (page) {
    // call its functions here first
    // now create web components with it's components
    page.components.forEach(async component => await page.createElement(component)) // make room for functions
  }

  async runMethods () {}
}
