<template>
  <v-sheet height="600">
    <v-event-dialog-form
      ref="eventForm"
      v-bind="{ worker }"
      @onSubmit="saveEvent"
    />
    <v-skeleton-loader
      :loading="loading"
      transition="fade-transition"
      type="date-picker-days"
    >
      <v-calendar
        ref="calendar"
        v-bind="{ start, weekdays, type, events }"
        color="primary"
      >
        <template
          v-slot:day-label="{ present, date, day, month: calendarMonth }"
        >
          <v-btn
            :disabled="calendarMonth !== +month"
            :color="present ? 'primary' : ''"
            text
            small
            @click="openNewEventForm(date)"
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
import notificationMixin from '@/mixins/notification'

export default {
  components: {
    VEventDialogForm,
  },
  mixins: [notificationMixin],
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
    serializeMovement(movements) {
      return movements.map((movement) => ({
        start: movement.date,
        name: `amount: ${movement.amount}`,
      }))
    },
    openNewEventForm(date) {
      this.$refs.eventForm.openDialog(date)
    },
    async saveEvent(cb) {
      try {
        const data = JSON.parse(JSON.stringify(this.$refs.eventForm.event))
        const createdAt = dayjs().toISOString()

        await this.$store.dispatch('createIncomeEvent', {
          event: { createdAt, ...data },
          id: this.worker.id,
          month: this.month,
          year: this.year,
        })
        this.$refs.eventForm.closeDialog()
        this.notifySuccess('Evento guardado')
      } catch {
        this.notifyError('Error al guardar')
      } finally {
        cb()
      }
    },
  },
}
</script>
