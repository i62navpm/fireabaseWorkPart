<template>
  <v-card height="377.2" outlined>
    <v-card-text>
      <ve-line :data="chartData" :colors="colors" />
    </v-card-text>
  </v-card>
</template>

<script>
import dayjs from 'dayjs'
import VeLine from 'v-charts/lib/line.common'

export default {
  components: {
    VeLine,
  },
  data() {
    return {
      colors: ['#4caf50', '#ff5252'],
      chartData: {
        columns: ['date', 'profit', 'cost'],
        rows: this.getRandomData(),
      },
    }
  },
  methods: {
    getRandomData() {
      const days = dayjs().daysInMonth()
      return Array.from({ length: days }, (v, k) => ({
        date: `01/${k + 1}`,
        cost: Math.random() * 100,
        profit: Math.random() * 100,
      }))
    },
  },
}
</script>
