import 'bootstrap'
import 'fontawesome'
import Razi from '~/libs/@razi/core'
import store from '~/store'
import router from '~/router'
import '../assets/css/home.css'
import '../assets/scss/home.scss'

const razi = new Razi({
  ele: 'app',
  store,
  router
})

razi.run()
