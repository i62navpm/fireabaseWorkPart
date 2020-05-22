<template>
  <v-app>
    <TheToolbar />

    <v-content>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import TheToolbar from '@/components/TheToolbar'

export default {
  name: 'App',
  components: { TheToolbar },
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
