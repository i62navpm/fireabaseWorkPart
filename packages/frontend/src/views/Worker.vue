<template>
  <v-container>
    <v-row>
      <v-load-data :loading="loading || !worker">
        <template #loading>
          <the-worker-title-skeleton />
        </template>
        <the-worker-title :worker="worker" />
      </v-load-data>
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
import TheWorkerTitleSkeleton from '@/components/TheWorkerTitleSkeleton'
import VLoadData from '@/components/VLoadData'
import loadingMixin from '@/mixins/loading.js'

export default {
  components: {
    TheWorkerTitle,
    TheWorkerTitleSkeleton,
    VLoadData,
  },
  mixins: [loadingMixin],
  props: {
    id: {
      type: String,
      required: true,
      default: '',
    },
  },
  computed: {
    worker() {
      return this.$store.getters.getWorker
    },
  },

  beforeRouteUpdate(to, from, next) {
    this.updateWorkerRef(to.params.id)
    next()
  },
  mounted() {
    this.updateWorkerRef(this.id)
  },
  methods: {
    updateWorkerRef(id) {
      this.startLoading()
      try {
        this.$store.dispatch('workerRef', id)
      } finally {
        this.stopLoading()
      }
    },
  },
}
</script>
