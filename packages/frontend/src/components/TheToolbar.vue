<template>
  <v-app-bar app elevate-on-scroll color="white">
    <v-toolbar-title>Diario</v-toolbar-title>

    <v-spacer />

    <v-fade-transition leave-absolute></v-fade-transition>
  </v-app-bar>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.v-app-bar.v-app-bar--hide-shadow {
  box-shadow: 0 1px 0 0 #dadce0;
}
</style>
