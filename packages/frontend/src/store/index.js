import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import toolbar from './modules/toolbar'
import workforce from './modules/workforce'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { auth, toolbar, workforce },
})
