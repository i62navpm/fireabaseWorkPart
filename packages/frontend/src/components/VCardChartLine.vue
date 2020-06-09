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
          income: 'A pagar',
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
        (v, k) => `${(k + 1).toString()}-${month}-${year}`
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
        date = this.transformDate(date)
        amount = +amount
        acc[date] = { [key]: acc[date] ? acc[date][key] + amount : amount }
        return acc
      }, {})
    },
    transformDate(date) {
      const [year, month, day] = date.split('-')
      return `${day}-${month}-${year}`
    },
  },
}
</script>
