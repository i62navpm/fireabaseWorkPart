<template>
  <v-sheet height="600">
    <v-event-dialog-form ref="eventForm" v-bind="{ worker }" />
    <v-skeleton-loader
      :loading="loading"
      transition="fade-transition"
      type="date-picker-days"
    >
      <v-calendar
        ref="calendar"
        v-bind="{ start, weekdays, type, events, eventColor }"
        color="primary"
        @click:event="({ event }) => openEventForm({ event: event.form })"
      >
        <template
          v-slot:day-label="{ present, date, day, month: calendarMonth }"
        >
          <v-btn
            :disabled="calendarMonth !== +month"
            :color="present ? 'primary' : ''"
            text
            small
            @click="openEventForm({ date })"
          >
            {{ day }}
          </v-btn>
        </template>
      </v-calendar>
    </v-skeleton-loader>
  </v-sheet>
</template>

<script>
import dayjs from 'dayjs'
import VEventDialogForm from '@/components/VEventDialogForm'

export default {
  components: {
    VEventDialogForm,
  },
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
  data: () => ({
    type: 'month',
    weekdays: [1, 2, 3, 4, 5, 6, 0],
  }),
  computed: {
    year() {
      return this.$route.params.year
    },
    month() {
      return this.$route.params.month
    },
    start() {
      return dayjs(`${this.year}-${this.month}`).format('YYYY-MM-DD')
    },
    workerMovements() {
      return this.$store.getters.getWorkerMovements
    },
    workerIncome() {
      return this.serializeMovement(this.workerMovements.income)
    },
    workerOutcome() {
      return this.serializeMovement(this.workerMovements.outcome)
    },
    events() {
      return [...this.workerIncome, ...this.workerOutcome]
    },
  },
  methods: {
    eventColor(event) {
      return this.$options.filters.eventColor(event.type)
    },
    serializeMovement(movements) {
      return movements.map((movement) => ({
        start: movement.date,
        type: movement.salary,
        name: `${movement.salary}: ${movement.amount}`,
        form: movement,
      }))
    },
    openEventForm({ event, date }) {
      this.$refs.eventForm.openDialog({ event, date })
    },
  },
}
</script>
