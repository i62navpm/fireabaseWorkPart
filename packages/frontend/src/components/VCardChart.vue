<template>
  <v-card height="377.2" outlined>
    <v-card-text>
      <v-load-data :loading="loading">
        <template #loading>
          <v-card-chart-skeleton />
        </template>
        <v-card-chart-line />
      </v-load-data>
    </v-card-text>
  </v-card>
</template>

<script>
import VCardChartLine from '@/components/VCardChartLine'
import VCardChartSkeleton from '@/components/VCardChartSkeleton'
import VLoadData from '@/components/VLoadData'

export default {
  components: {
    VCardChartLine,
    VCardChartSkeleton,
    VLoadData,
  },
  props: {
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>
