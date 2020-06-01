export default {
  methods: {
    notifySuccess(message) {
      this.$store.dispatch('notifySuccess', message)
    },
    notifyError(message) {
      this.$store.dispatch('notifyError', message)
    },
    notifyWarning(message) {
      this.$store.dispatch('notifyWarning', message)
    },
    closeNotification() {
      this.$store.dispatch('closeNotification')
    },
  },
}
