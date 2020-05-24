<template>
  <v-btn icon @click="logout">
    <v-icon>mdi-logout</v-icon>
  </v-btn>
</template>

<script>
import { auth } from '@/plugins/firebase/auth'
import loadingMixin from '@/mixins/loading.js'

export default {
  mixins: [loadingMixin],
  methods: {
    async logout() {
      try {
        this.startLoading()
        await auth.signOut()
      } finally {
        this.stopLoading()
      }
    },
  },
}
</script>
