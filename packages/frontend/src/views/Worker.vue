<template>
  <v-container>
    <v-load-data :loading="loading || !worker">
      <template #loading>
        <the-worker-title-skeleton />
      </template>
      <the-worker-title :worker="worker" />
    </v-load-data>

    <v-fade-transition mode="out-in">
      <router-view />
    </v-fade-transition>
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
      return this.$store.getters.getWorkerRef(this.id)
    },
  },
}
</script>
