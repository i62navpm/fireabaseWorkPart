<template>
  <v-dialog v-model="open" max-width="600" @click:outside="closeDialog">
    <v-form ref="form" v-model="valid" @submit.prevent>
      <v-card>
        <v-list>
          <v-list-item two-line>
            <v-list-item-avatar>
              <v-img :src="avatarUrl" :alt="worker.name"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                {{ worker.name }}
              </v-list-item-title>
              <v-list-item-subtitle class="d-flex align-center">
                <v-icon small color="success">mdi-arrow-up-bold</v-icon>
                <span class="mr-2">{{ worker.fullSalary }}€</span>
                <v-icon small color="error">mdi-arrow-down-bold</v-icon>
                <span>{{ worker.halfSalary }}€</span>
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="closeDialog">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>

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
                  :autofocus="event.salary === 'customSalary'"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-work-place-select v-model="event.work" />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            v-if="event.id"
            text
            :loading="loading"
            color="error"
            @click.native="remove"
          >
            Eliminar
          </v-btn>
          <v-btn
            outlined
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
import VWorkPlaceSelect from '@/components/VWorkPlaceSelect'
import loadingMixin from '@/mixins/loading'

export default {
  components: { VWorkPlaceSelect },
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
    avatarUrl() {
      return `https://avatars.dicebear.com/api/male/${this.worker.id}.svg`
    },
  },
  methods: {
    openDialog({ event }) {
      this.event = event
        ? { ...event, id: event.id }
        : { salary: 'fullSalary', work: [], amount: this.worker.fullSalary }
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
    remove() {
      this.startLoading()
      this.$emit('onRemove', this.stopLoading)
    },
  },
}
</script>
