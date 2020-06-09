<template>
  <v-skeleton-loader
    height="600"
    :loading="loading"
    transition="fade-transition"
    type="date-picker-days"
  >
    <v-card outlined>
      <v-data-table
        :headers="headers"
        :items-per-page="data.length"
        :items="data"
        dense
        hide-default-footer
      >
        <template v-slot:item.date="{ item, value }">
          <div :class="isLastRow(item) && 'my-6 subtitle-1'">
            {{ value }}
          </div>
        </template>
        <template v-slot:item.income="{ item, value }">
          <span :class="isLastRow(item) && 'info--text subtitle-1'">
            {{ value | amountCurrency }}
          </span>
        </template>
        <template v-slot:item.outcome="{ item, value }">
          <span :class="isLastRow(item) && 'error--text subtitle-1'">
            {{ value | amountCurrency }}
          </span>
        </template>
        <template v-slot:item.work="{ item, value }">
          <div
            :class="
              isLastRow(item) &&
              `${
                value < 0 ? 'error--text' : 'green--text'
              } text-center subtitle-1`
            "
          >
            {{
              isLastRow(item) ? $options.filters.amountCurrency(value) : value
            }}
          </div>
        </template>
      </v-data-table>
    </v-card>
  </v-skeleton-loader>
</template>

<script>
import dayjs from 'dayjs'

export default {
  props: {
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    worker: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      headers: [
        {
          text: 'Día',
          sortable: false,
          align: 'start',
          value: 'date',
          width: '10%',
        },
        {
          text: 'A pagar',
          align: 'center',
          width: '20%',
          sortable: false,
          value: 'income',
        },
        {
          text: 'A cuenta',
          align: 'center',
          width: '20%',
          sortable: false,
          value: 'outcome',
        },
        { text: 'Obras', width: '50%', sortable: false, value: 'work' },
      ],
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
    workerWork() {
      return this.serializeWork(this.workerMovements.income)
    },
    workerOutcome() {
      return this.serializeMovement('outcome', this.workerMovements.outcome)
    },
    data() {
      const rows = this.monthList.reduce((acc, date) => {
        acc.push({
          date: this.shortDate(date),
          ...{ income: 0, ...this.workerIncome[date] },
          ...{ outcome: 0, ...this.workerOutcome[date] },
          ...{ work: this.workerWork[date] },
        })
        return acc
      }, [])

      const total = rows.reduce(
        (acc, curr) => {
          acc.income += curr.income
          acc.outcome += curr.outcome
          return acc
        },
        { income: 0, outcome: 0 }
      )
      rows.push({
        date: 'TOTAL',
        income: total.income,
        outcome: total.outcome,
        work: total.income - total.outcome,
      })
      return rows
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
    serializeWork(data) {
      return data.reduce((acc, { date, work = [] }) => {
        date = this.transformDate(date)
        acc[date] = work.map((item) => item.name).join(', ')
        return acc
      }, {})
    },
    transformDate(date) {
      const [year, month, day] = date.split('-')
      return `${day}-${month}-${year}`
    },
    shortDate(date) {
      const [day, month] = date.split('-')
      return `${day}/${month}`
    },
    isLastRow(item) {
      return item.date === 'TOTAL'
    },
  },
}
</script>
