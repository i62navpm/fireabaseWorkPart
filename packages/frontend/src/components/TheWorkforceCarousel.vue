<template>
  <v-slide-group :value="activeWorker" mandatory center-active show-arrows>
    <v-slide-item v-for="worker in workforce" :key="worker.id">
      <v-fade-transition mode="out-in">
        <v-worker-card
          class="ma-4"
          :worker="worker"
          :loading="loading"
          :active="activeWorkerId === worker.id"
        >
          <template v-slot:loading>
            <v-skeleton-loader type="list-item-avatar-three-line" />
          </template>
        </v-worker-card>
      </v-fade-transition>
    </v-slide-item>
    <v-slide-item>
      <v-worker-card-add class="ma-4" />
    </v-slide-item>
  </v-slide-group>
</template>

<script>
import VWorkerCard from '@/components/VWorkerCard'
import VWorkerCardAdd from '@/components/VWorkerCardAdd'
import loadingMixin from '@/mixins/loading.js'

export default {
  components: { VWorkerCard, VWorkerCardAdd },
  mixins: [loadingMixin],
  computed: {
    workforce() {
      return this.$store.getters.getWorkforce
    },
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
