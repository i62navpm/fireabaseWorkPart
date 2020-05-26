<template>
  <v-container>
    <v-row>
      Hola {{ $route.path }}
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </v-row>
  </v-container>
</template>

<script>
export default {}
</script>
