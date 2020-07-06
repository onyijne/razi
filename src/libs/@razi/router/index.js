import Navigo from 'navigo'

const RazRouter = class RazRouter {
  constructor (params = {}) {
    this.router = new Navigo(window.location.host, false)
    this.routes = params.routes || {}
    /* if (params.hasOwnProperty('routes')) {
      params.routes.forEach(route => {
        this.routes.on(route.path, () => this.setPage(route))
      })
    }  */
  }

  async assignRoute (razi) {
    for (const idx in this.routes) {
      const route = this.routes[idx]
      if (route.path === '*') {
        this.router.notFound(async query => {
          await razi.setPage(route)
        })
      } else {
        this.router.on(route.path, async () => await razi.setPage(route))
      }
    }
  }

  start () {
    return this.router.resolve()
  }

  bindNavigo (node) {
    node.querySelectorAll('a').forEach(ele => {
      ele.setAttribute('data-navigo', '')
      const location = ele.getAttribute('href')
      if (location === '#') return
      ele.addEventListener('click', e => {
        e.preventDefault()
        this.routes.navigate(location, true)
      })
    })
  }
}

export default RazRouter
