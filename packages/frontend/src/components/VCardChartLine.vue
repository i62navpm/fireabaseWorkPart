<template>
  <ve-line :data="chartData" v-bind="{ colors, settings }" />
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
      settings: {
        labelMap: {
          income: 'Ingreso',
          outcome: 'A cuenta',
        },
      },
    }
  },
  computed: {
    monthList() {
      const { month, year } = this.$route.params
      const days = dayjs(`${year}-${month}`).daysInMonth()

      return Array.from(
        { length: days },
        (v, k) => `${(k + 1).toString().padStart(2, '0')}-${month}-${year}`
      )
    },
    workerMovements() {
      return this.$store.getters.getWorkerMovements
    },
    workerIncome() {
      return this.serializeMovement('income', this.workerMovements.income)
    },
    workerOutcome() {
      return this.serializeMovement('outcome', this.workerMovements.outcome)
    },
    chartData() {
      const rows = this.monthList.reduce((acc, date) => {
        acc.push({
          date,
          ...{ income: 0, ...this.workerIncome[date] },
          ...{ outcome: 0, ...this.workerOutcome[date] },
        })
        return acc
      }, [])

      return {
        columns: ['date', 'income', 'outcome'],
        rows,
      }
    },
  },

  methods: {
    serializeMovement(key, data) {
      return data.reduce((acc, { date, amount }) => {
        acc[date] = { [key]: amount }
        return acc
      }, {})
    },
  },
}
</script>
