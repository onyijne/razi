/**
 * This is a light template system in js and html
 */
import html from './header.html'

const id = 'header' // the id given to the template tag in header.html

const header = {
  name: id, // should be unique in the application, accepts only \[a-z]([-][a-z])\
  id, // should be unique in the application
  beforeMount: () => {}, // overrides component default beforeMount handler
  afterMount: () => {}, // overrides component default afterMount handler
  html
}

export default header
