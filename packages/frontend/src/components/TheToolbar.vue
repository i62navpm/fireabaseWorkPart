<template>
  <v-app-bar app elevate-on-scroll color="white">
    <v-toolbar-title>
      <router-link to="/">
        <v-list-item class="px-0">
          <v-list-item-avatar class="mr-3">
            <v-img src="../assets/logo.png" contain></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            Nóminas
          </v-list-item-content>
        </v-list-item>
      </router-link>
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
