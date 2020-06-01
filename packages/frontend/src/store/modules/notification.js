export default {
  state: {
    show: false,
    message: '',
    color: 'success',
  },
  mutations: {
    setNotification: (
      state,
      { show = false, message = '', color = 'success' }
    ) => {
      state.show = show
      state.message = message
      state.color = color
    },
  },
  actions: {
    notifySuccess: ({ commit }, message) =>
      commit('setNotification', {
        show: true,
        message,
        color: 'success',
      }),
    notifyError: ({ commit }, message) =>
      commit('setNotification', {
        show: true,
        message,
        color: 'error',
      }),
    notifyWarning: ({ commit }, message) =>
      commit('setNotification', {
        show: true,
        message,
        color: 'warning',
      }),
    closeNotification: ({ commit }) =>
      commit('setNotification', {
        show: false,
        message: '',
      }),
  },
  getters: {
    getNotification: (state) => state,
  },
}
