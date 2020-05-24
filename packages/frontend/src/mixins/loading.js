export default {
  data() {
    return { loading: false }
  },
  methods: {
    startLoading() {
      this.loading = true
      this.$store.dispatch('startLoading')
    },
    stopLoading() {
      this.loading = false
      this.$store.dispatch('stopLoading')
    },
  },
}
