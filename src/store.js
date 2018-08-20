import Vue from 'vue'
import Vuex from 'vuex'
import actions from './site/actions'
import modules from './site/mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  actions,
  modules,
  strict: true,
})

export default store
