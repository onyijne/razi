import 'bootstrap'
import 'fontawesome'
import Razi from 'Razi'
import store from '~/store'
import router from '~/router'
import '../assets/scss/login.scss'

const razi = new Razi({
  ele: 'app',
  store,
  router
})

razi.run()
