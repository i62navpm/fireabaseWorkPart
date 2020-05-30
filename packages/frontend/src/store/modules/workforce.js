export default {
  state: {
    workforce: [],
  },
  mutations: {
    setWorkforce: (state, workforce) => (state.workforce = workforce),
  },
  actions: {
    setWorkforce: ({ commit }, workforce) => commit('setWorkforce', workforce),
  },
  getters: {
    getWorkforce: (state) => state.workforce,
  },
}
