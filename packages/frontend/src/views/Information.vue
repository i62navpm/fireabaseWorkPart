<template>
  <v-container>
    <v-row> Calendar {{ $route.path }} </v-row>
    <v-row>
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </v-row>
  </v-container>
</template>

<script>
export default {}
</script>
