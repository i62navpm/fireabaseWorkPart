<template>
  <v-app>
    <TheToolbar />

    <v-content>
      <v-fade-transition mode="out-in">
        <router-view v-if="!loading" />
      </v-fade-transition>
    </v-content>
  </v-app>
</template>

<script>
import TheToolbar from '@/components/TheToolbar'
import { auth } from '@/plugins/firebase/auth'
import loadingMixin from '@/mixins/loading.js'

export default {
  name: 'App',
  components: { TheToolbar },
  mixins: [loadingMixin],
  async created() {
    this.startLoading()
    try {
      await this.getRedirectResult()
      this.detectUserChanged()
    } finally {
      this.stopLoading()
    }
  },
  methods: {
    detectUserChanged() {
      auth.onAuthStateChanged((user) => this.$store.commit('setUser', user))
    },
    async getRedirectResult() {
      const { additionalUserInfo } = await auth.getRedirectResult()
      if (additionalUserInfo?.isNewUser) {
        await this.$store.dispatch(
          'createUser',
          additionalUserInfo.profile.email
        )
      }
    },
  },
}
</script>
