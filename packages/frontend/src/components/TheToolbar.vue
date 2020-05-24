<template>
  <v-app-bar app elevate-on-scroll color="white">
    <v-toolbar-title>
      <router-link to="/">Diario</router-link>
    </v-toolbar-title>

    <v-spacer />

    <the-toolbar-profile />
  </v-app-bar>
</template>

<script>
import TheToolbarProfile from '@/components/TheToolbarProfile'

export default {
  components: {
    TheToolbarProfile,
  },
}
</script>

<style lang="scss" scoped>
.v-app-bar.v-app-bar--hide-shadow {
  box-shadow: 0 1px 0 0 #dadce0;
}
.v-toolbar__title a {
  color: inherit;
  text-decoration: inherit;
}
</style>
