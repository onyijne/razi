/**
 * This is a light template system in js and html
 */
import html from './home.html'
import header from '~/components/header'

const id = 'home' // the id given to the template tag in header.html

const home = {
  name: id, // should be unique in the application, accepts only \[a-z]([-][a-z])\
  id, // should be unique in the application
  components: [
    header
  ],
  beforeMount: () => {}, // overrides component default beforeMount handler
  afterMount: () => {}, // overrides component default afterMount handler
  html,
  methods: {
    test () {
      console.warn('nope')
    },
    another () {
      console.log('okay')
    }
  }
}
export default home
