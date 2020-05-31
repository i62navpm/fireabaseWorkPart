<template>
  <v-dialog v-model="open" max-width="600" @click:outside="closeDialog">
    <v-form ref="form" v-model="valid" @submit.prevent>
      <v-card>
        <v-card-title class="headline">
          Trabajador
          <v-spacer></v-spacer>
          <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="worker.name"
                  name="name"
                  label="Nombre del trabajador"
                  hint="Campo obligatorio"
                  :rules="[rules.required]"
                  persistent-hint
                  autofocus
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="worker.nif"
                  v-mask="'########-A'"
                  name="nif"
                  label="NIF"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="worker.phone"
                  type="tel"
                  name="phone"
                  label="Teléfono"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="worker.email"
                  type="email"
                  name="email"
                  label="Email"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-address-input v-model="worker.address" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="worker.fullSalary"
                  append-icon="mdi-cash-multiple"
                  type="number"
                  name="fullSalary"
                  label="Salario completo"
                  hint="Campo obligatorio"
                  :rules="[rules.required]"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="worker.halfSalary"
                  append-icon="mdi-cash-multiple"
                  type="number"
                  name="halfSalary"
                  label="Salario reducido"
                  hint="Campo obligatorio"
                  :rules="[rules.required]"
                  persistent-hint
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
import VAddressInput from '@/components/VAddressInput'
import loadingMixin from '@/mixins/loading'

export default {
  directives: { mask },
  components: {
    VAddressInput,
  },
  mixins: [loadingMixin],
  data: () => ({
    open: false,
    valid: false,
    worker: {},
    rules: {
      required: (value) => !!value || 'Este campo es obligatorio.',
    },
  }),
  methods: {
    openDialog(worker) {
      if (worker) this.worker = { ...worker }

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
