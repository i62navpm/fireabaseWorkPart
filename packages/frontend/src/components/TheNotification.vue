<template>
  <v-snackbar
    :value="notification.show"
    :color="notification.color"
    multi-line
    @input="onChange"
  >
    {{ notification.message }}
    <v-btn dark text @click="$store.dispatch('closeNotification')">
      Cerrar
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: 'TheNotification',
  computed: {
    notification() {
      return this.$store.getters.getNotification
    },
  },
  methods: {
    onChange() {
      this.$store.dispatch('closeNotification')
    },
  },
}
</script>
