<template>
  <v-dialog v-model="open" max-width="600" @click:outside="closeDialog">
    <v-form ref="form" v-model="valid" @submit.prevent>
      <v-card>
        <v-card-title class="headline">
          Evento
          <v-spacer></v-spacer>
          <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row justify="space-around">
              <v-col cols="12" class="pb-0">
                <v-row justify="space-around">
                  <v-chip-group
                    v-model="salary"
                    mandatory
                    column
                    active-class="primary--text"
                  >
                    <v-chip
                      filter
                      value="fullSalary"
                      outlined
                      label
                      color="success"
                    >
                      Salario completo
                    </v-chip>
                    <v-chip
                      filter
                      value="halfSalary"
                      outlined
                      label
                      color="warning"
                    >
                      Salario parcial
                    </v-chip>
                    <v-chip
                      filter
                      value="customSalary"
                      outlined
                      label
                      color="info"
                    >
                      Salario Personalizado
                    </v-chip>
                  </v-chip-group>
                </v-row>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  ref="amount"
                  v-model="event.amount"
                  name="amount"
                  type="number"
                  label="Salario"
                  :readonly="event.salary !== 'customSalary'"
                  :rules="[rules.required]"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text
            :loading="loading"
            color="primary"
            type="submit"
            @click.native="submit"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { mask } from 'vue-the-mask'
import loadingMixin from '@/mixins/loading'

export default {
  directives: { mask },
  mixins: [loadingMixin],
  props: {
    worker: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data: () => ({
    open: false,
    valid: false,
    event: {},
    date: '',
    rules: {
      required: (value) => !!value || 'Este campo es obligatorio.',
    },
  }),
  computed: {
    salary: {
      get() {
        return this.event.salary
      },
      set(salary) {
        this.event.amount = this.worker[salary] || this.worker['fullSalary']
        this.event.salary = salary
      },
    },
  },
  watch: {
    salary: function (value) {
      if (value === 'customSalary') {
        this.$nextTick(this.$refs.amount.focus)
      }
    },
  },
  methods: {
    openDialog({ date, event }) {
      this.event = event
        ? { ...event, id: event.id }
        : { salary: 'fullSalary', amount: this.worker.fullSalary, date }
      this.open = true
    },
    closeDialog() {
      this.open = false
      this.$refs.form.reset()
    },
    submit() {
      if (!this.$refs.form.validate()) {
        return
      }
      this.startLoading()
      this.$emit('onSubmit', this.stopLoading)
    },
  },
}
</script>
