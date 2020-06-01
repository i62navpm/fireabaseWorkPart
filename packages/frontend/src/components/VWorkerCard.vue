<template>
  <v-hover v-slot:default="{ hover }">
    <v-card width="300" elevation="0">
      <v-worker-card-overlay v-bind="{ hover, worker }" />
      <v-worker-card-detail v-bind="{ hover, active, worker }" />
    </v-card>
  </v-hover>
</template>

<script>
import VWorkerCardOverlay from '@/components/VWorkerCardOverlay'
import VWorkerCardDetail from '@/components/VWorkerCardDetail'

export default {
  components: {
    VWorkerCardOverlay,
    VWorkerCardDetail,
  },
  props: {
    worker: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
