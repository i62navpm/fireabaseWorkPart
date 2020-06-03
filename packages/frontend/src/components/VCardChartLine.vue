<template>
  <ve-line :data="chartData" :colors="colors" />
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
