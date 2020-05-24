export default {
  state: {
    loading: false,
  },
  mutations: {
    setLoading: (state, value) => (state.loading = value),
  },
  actions: {
    startLoading: ({ commit }) => commit('setLoading', true),
    stopLoading: ({ commit }) => commit('setLoading', false),
  },
  getters: {
    getLoading: (state) => state.loading,
  },
}
