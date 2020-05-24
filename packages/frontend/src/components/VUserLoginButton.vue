<template>
  <v-btn text @click="login">Entrar</v-btn>
</template>

<script>
import { auth, provider } from '@/plugins/firebase/auth'
import loadingMixin from '@/mixins/loading.js'

export default {
  mixins: [loadingMixin],
  methods: {
    async login() {
      try {
        this.startLoading()
        await auth.signInWithRedirect(provider)
      } finally {
        this.stopLoading()
      }
    },
  },
}
</script>
