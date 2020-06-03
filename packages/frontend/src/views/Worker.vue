<template>
  <v-container>
    <v-load-data :loading="!worker">
      <template #loading>
        <the-worker-title-skeleton />
      </template>
      <the-worker-title :worker="worker" />
    </v-load-data>

    <v-row>
      <v-col order="2" order-sm="1" cols="12" sm="6" md="4">
        <v-date-picker v-bind="{ year, month }" />
      </v-col>
      <v-col order="1" order-sm="2" cols="12" sm="6" md="8">
        <v-card-chart v-bind="{ loading }" />
      </v-col>
    </v-row>

    <v-fade-transition mode="out-in">
      <router-view />
    </v-fade-transition>
  </v-container>
</template>

<script>
import dayjs from 'dayjs'
import TheWorkerTitle from '@/components/TheWorkerTitle'
import TheWorkerTitleSkeleton from '@/components/TheWorkerTitleSkeleton'
import VCardChart from '@/components/VCardChart'
import VDatePicker from '@/components/VDatePicker'
import VLoadData from '@/components/VLoadData'
import loadingMixin from '@/mixins/loading.js'
import notificationMixin from '@/mixins/notification'

export default {
  components: {
    TheWorkerTitle,
    TheWorkerTitleSkeleton,
    VDatePicker,
    VCardChart,
    VLoadData,
  },
  mixins: [loadingMixin, notificationMixin],
  props: {
    id: {
      type: String,
      required: true,
      default: '',
    },
    year: {
      type: String,
      required: true,
      default: dayjs().format('YYYY'),
    },
    month: {
      type: String,
      required: true,
      default: dayjs().format('MM'),
    },
  },
  computed: {
    worker() {
      return this.$store.getters.getWorkerRef(this.id)
    },
  },
  watch: {
    '$route.params': {
      immediate: true,
      async handler(params) {
        this.startLoading()
        try {
          await this.$store.dispatch('incomeRef', params)
          await this.$store.dispatch('outcomeRef', params)
        } catch {
          this.notifyError('Error al obtener la plantilla')
        } finally {
          this.stopLoading()
        }
      },
    },
  },
}
</script>
