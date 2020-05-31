<template>
  <v-slide-group :value="activeWorker" mandatory center-active show-arrows>
    <v-slide-item v-for="worker in workforce" :key="worker.id">
      <v-fade-transition mode="out-in">
        <v-worker-card
          class="ma-4"
          :worker="worker"
          :active="activeWorkerId === worker.id"
        />
      </v-fade-transition>
    </v-slide-item>
    <v-slide-item>
      <v-worker-card-add :loading="loading" class="ma-4">
        <template v-slot:loading>
          <v-skeleton-loader type="list-item-avatar-three-line" />
        </template>
      </v-worker-card-add>
    </v-slide-item>
  </v-slide-group>
</template>

<script>
import VWorkerCard from '@/components/VWorkerCard'
import VWorkerCardAdd from '@/components/VWorkerCardAdd'

export default {
  components: { VWorkerCard, VWorkerCardAdd },
  props: {
    workforce: {
      type: Array,
      required: true,
      default: () => [],
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    activeWorkerId() {
      return this.$route.params?.id
    },
    activeWorker() {
      return this.workforce.findIndex(
        (worker) => worker.id === this.activeWorkerId
      )
    },
  },
}
</script>
