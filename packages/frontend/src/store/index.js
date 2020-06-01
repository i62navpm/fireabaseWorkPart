import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations } from 'vuexfire'
import auth from './modules/auth'
import notification from './modules/notification'
import toolbar from './modules/toolbar'
import workforce from './modules/workforce'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: { ...vuexfireMutations },
  actions: {},
  modules: { auth, notification, toolbar, workforce },
})
