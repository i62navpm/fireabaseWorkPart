<template>
  <v-app>
    <TheToolbar />
    <TheNotification />

    <v-content>
      <v-fade-transition mode="out-in">
        <router-view v-if="!loading" />
      </v-fade-transition>
    </v-content>
  </v-app>
</template>

<script>
import TheToolbar from '@/components/TheToolbar'
import TheNotification from '@/components/TheNotification'
import { auth } from '@/plugins/firebase/auth'
import loadingMixin from '@/mixins/loading.js'
import notificationMixin from '@/mixins/notification'

export default {
  name: 'App',
  components: { TheToolbar, TheNotification },
  mixins: [loadingMixin, notificationMixin],
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
        try {
          await this.$store.dispatch(
            'createUser',
            additionalUserInfo.profile.email
          )
        } catch {
          this.notifyError('Error al crear el usuario')
        }
      }
    },
  },
}
</script>
