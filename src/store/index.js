import Store from '~/libs/@razi/core/Store'
import actions from './actions.js'
import mutations from './mutations.js'
import state from './state.js'

export default new Store({
  actions,
  mutations,
  state
})
