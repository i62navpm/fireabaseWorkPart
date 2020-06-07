<template>
  <v-sheet>
    <v-event-dialog-form ref="eventForm" v-bind="{ worker }" />
    <vue-selecto
      drag-container=".the-worker-calendar"
      :selectable-targets="['.v-calendar-weekly__day-label .v-btn']"
      :hit-rate="0"
      :select-by-click="true"
      :select-from-inside="true"
      @select="onSelect"
      @selectEnd="onSelectEnd"
    ></vue-selecto>

    <div class="the-worker-calendar">
      <v-skeleton-loader
        height="600"
        :loading="loading"
        transition="fade-transition"
        type="date-picker-days"
      >
        <v-calendar
          ref="calendar"
          :event-more="false"
          v-bind="{ start, weekdays, type, events, eventColor }"
          color="primary"
          @click:event="({ event }) => openEventForm({ event: event.form })"
        >
          <template
            v-slot:day-label="{ present, date, day, month: calendarMonth }"
          >
            <v-btn
              class="mb-1"
              :disabled="calendarMonth !== +month"
              :color="present ? 'primary' : ''"
              text
              small
              @click="openEventForm({ date: [date] })"
            >
              {{ day }}
            </v-btn>
          </template>
        </v-calendar>
      </v-skeleton-loader>
    </div>
  </v-sheet>
</template>

<script>
import dayjs from 'dayjs'
import { VueSelecto } from 'vue-selecto'
import VEventDialogForm from '@/components/VEventDialogForm'

export default {
  components: {
    VEventDialogForm,
    VueSelecto,
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
  mounted() {
    document
      .querySelector('.the-worker-calendar')
      .addEventListener('touchend', (e) => e.target.click())
  },
  methods: {
    eventColor(event) {
      return this.$options.filters.eventColor(event.type)
    },
    serializeMovement(movements) {
      return movements.map((movement) => ({
        start: movement.date,
        type: movement.salary,
        name:
          movement.salary !== 'debtSalary'
            ? `Salario: ${movement.amount}€`
            : `A cuenta: ${movement.amount}€`,
        form: movement,
      }))
    },
    openEventForm({ event, date }) {
      this.$refs.eventForm.openDialog({ event, date })
    },
    onSelect(e) {
      e.selected.forEach((el) => {
        el.classList.add('selected')
      })
      e.removed.forEach((el) => {
        el.classList.remove('selected')
      })
    },
    onSelectEnd(e) {
      const eventsSelected = e.selected
        .filter((el) => !el.disabled)
        .map((el) => `${this.year}-${this.month}-${el.innerText}`)
      e.selected.forEach((el) => el.classList.remove('selected'))

      if (eventsSelected.length) {
        this.openEventForm({ date: eventsSelected.sort() })
      }
    },
  },
}
</script>

<style lang="scss">
.v-calendar-weekly__week {
  min-height: 100px !important;
}

.v-calendar-weekly__day-label {
  .v-btn {
    transition: all ease 0.2s;
  }
  .selected.v-btn:not(:disabled) {
    background: #2094f380;
    color: white;
  }
}
</style>
