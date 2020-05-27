<template>
  <v-container>
    <v-row>
      <the-worker-title />
    </v-row>
    <v-row>
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </v-row>
  </v-container>
</template>

<script>
import TheWorkerTitle from '@/components/TheWorkerTitle'

export default {
  components: {
    TheWorkerTitle,
  },
}
</script>
