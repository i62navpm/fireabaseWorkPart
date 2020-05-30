import { db } from '@/plugins/firebase/db'

export default {
  state: {
    user: null,
  },
  mutations: {
    setUser: (state, user) => (state.user = user),
  },
  actions: {
    setUser: ({ commit }, user) => commit('setUser', user),
    createUser: (_, email) => db.collection('users').doc(email).set({}),
  },
  getters: {
    getUser: (state) => state.user,
  },
}
