<template>
  <div>
    <v-event-income-dialog-form
      ref="eventIncomeForm"
      v-bind="{ worker }"
      @onSubmit="saveIncomeEvent"
      @onRemove="removeIncomeEvent"
    />
    <v-event-outcome-dialog-form
      ref="eventOutcomeForm"
      v-bind="{ worker }"
      @onSubmit="saveOutcomeEvent"
      @onRemove="removeOutcomeEvent"
    />
    <v-bottom-sheet v-model="open" inset>
      <v-list>
        <v-subheader>Opciones:</v-subheader>
        <v-list-item @click="openEventIncome">
          <v-list-item-avatar>
            <v-icon color="success">
              mdi-cash-plus
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-title>Pagar</v-list-item-title>
        </v-list-item>
        <v-list-item @click="openEventOutcome">
          <v-list-item-avatar>
            <v-icon color="error">
              mdi-cash-minus
            </v-icon>
          </v-list-item-avatar>
          <v-list-item-title>Dar a cuenta</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-bottom-sheet>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import VEventIncomeDialogForm from '@/components/VEventIncomeDialogForm'
import VEventOutcomeDialogForm from '@/components/VEventOutcomeDialogForm'
import notificationMixin from '@/mixins/notification'

export default {
  components: { VEventIncomeDialogForm, VEventOutcomeDialogForm },
  mixins: [notificationMixin],
  props: {
    worker: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data: () => ({
    open: false,
    event: {},
    date: '',
  }),
  computed: {
    year() {
      return this.$route.params.year
    },
    month() {
      return this.$route.params.month
    },
  },
  methods: {
    openDialog({ date, event }) {
      this.event = event
      this.date = date
      if (this.event?.id) {
        if (this.event.salary === 'debtSalary') {
          this.openEventOutcome()
        } else {
          this.openEventIncome()
        }
      } else {
        this.open = true
      }
    },
    closeDialog() {
      this.open = false
    },
    openEventIncome() {
      this.closeDialog()
      this.$refs.eventIncomeForm.openDialog({
        event: this.event,
      })
    },
    openEventOutcome() {
      this.closeDialog()
      this.$refs.eventOutcomeForm.openDialog({
        event: this.event,
      })
    },
    async getWorkRefs(works = []) {
      try {
        return await Promise.all(
          works.map(({ id }) => this.$store.dispatch('getWorkRef', id))
        )
      } catch (err) {
        this.notifyError('Error al obtener las referencias')
      }
    },
    async saveIncomeEvent(cb) {
      try {
        const { id, ...event } = { ...this.$refs.eventIncomeForm.event }
        const createdAt = dayjs().toISOString()
        const action = id ? 'updateIncomeEvent' : 'createIncomeEvent'
        const data = {
          id,
          event: { createdAt, ...event },
          workerId: this.worker.id,
          month: this.month,
          year: this.year,
        }

        data.event.work = await this.getWorkRefs(data.event.work)

        if (action === 'updateIncomeEvent') {
          await this.dispatchEvent(action, data)
        } else {
          data.events = this.date.map((date) => ({
            ...data.event,
            date,
          }))
          await this.dispatchEvent(action, data)
        }

        this.$refs.eventIncomeForm.closeDialog()
        this.notifySuccess('Evento guardado')
      } catch (err) {
        this.notifyError('Error al guardar')
      } finally {
        cb()
      }
    },
    async saveOutcomeEvent(cb) {
      try {
        const { id, ...event } = { ...this.$refs.eventOutcomeForm.event }
        const createdAt = dayjs().toISOString()
        const action = id ? 'updateOutcomeEvent' : 'createOutcomeEvent'
        const data = {
          id,
          event: { createdAt, ...event },
          workerId: this.worker.id,
          month: this.month,
          year: this.year,
        }

        if (action === 'updateOutcomeEvent') {
          await this.dispatchEvent(action, data)
        } else {
          data.events = this.date.map((date) => ({
            ...data.event,
            date,
          }))
          await this.dispatchEvent(action, data)
        }

        this.$refs.eventOutcomeForm.closeDialog()
        this.notifySuccess('Evento guardado')
      } catch (err) {
        this.notifyError('Error al guardar')
      } finally {
        cb()
      }
    },
    async removeIncomeEvent(cb) {
      try {
        const { id } = { ...this.$refs.eventIncomeForm.event }
        const action = 'removeIncomeEvent'
        const data = {
          id,
          workerId: this.worker.id,
          month: this.month,
          year: this.year,
        }

        await this.dispatchEvent(action, data)

        this.$refs.eventIncomeForm.closeDialog()
        this.notifySuccess('Evento eliminado')
      } catch (err) {
        this.notifyError('Error al eliminar')
      } finally {
        cb()
      }
    },
    async removeOutcomeEvent(cb) {
      try {
        const { id } = { ...this.$refs.eventOutcomeForm.event }
        const action = 'removeOutcomeEvent'
        const data = {
          id,
          workerId: this.worker.id,
          month: this.month,
          year: this.year,
        }

        await this.dispatchEvent(action, data)

        this.$refs.eventOutcomeForm.closeDialog()
        this.notifySuccess('Evento eliminado')
      } catch (err) {
        this.notifyError('Error al eliminar')
      } finally {
        cb()
      }
    },
    dispatchEvent(action, data) {
      return this.$store.dispatch(action, data)
    },
  },
}
</script>
