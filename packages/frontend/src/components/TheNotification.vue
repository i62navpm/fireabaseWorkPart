<template>
  <v-snackbar
    top
    right
    :value="notification.show"
    :color="notification.color"
    @input="onChange"
  >
    {{ notification.message }}

    <template v-slot:action>
      <v-btn dark text @click="$store.dispatch('closeNotification')">
        Cerrar
      </v-btn>
    </template>
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
