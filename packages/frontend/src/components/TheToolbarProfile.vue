<template>
  <v-fade-transition mode="out-in">
    <component :is="currentProfileComponent" v-bind="{ user }"></component>
  </v-fade-transition>
</template>

<script>
import VUserMenu from '@/components/VUserMenu'
import VUserLoginButton from '@/components/VUserLoginButton'
import VUserLoading from '@/components/VUserLoading'

export default {
  components: {
    VUserMenu,
    VUserLoginButton,
    VUserLoading,
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    loading() {
      return this.$store.getters.getLoading
    },
    currentProfileComponent() {
      if (this.loading) return VUserLoading
      return this.user ? VUserMenu : VUserLoginButton
    },
  },
}
</script>

<style lang="scss" scoped></style>
