<template>
  <v-dialog v-model="open" max-width="600" @click:outside="closeDialog">
    <v-form ref="form" v-model="valid" @submit.prevent>
      <v-card>
        <v-card-title class="headline">
          Obra
          <v-spacer></v-spacer>
          <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="work.name"
                  name="name"
                  label="Nombre de la obra"
                  hint="Campo obligatorio"
                  :rules="[rules.required]"
                  persistent-hint
                  autofocus
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-address-input v-model="work.address" />
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
import VAddressInput from '@/components/VAddressInput'
import loadingMixin from '@/mixins/loading'

export default {
  components: {
    VAddressInput,
  },
  mixins: [loadingMixin],
  data: () => ({
    open: false,
    valid: false,
    work: {},
    rules: {
      required: (value) => !!value || 'Este campo es obligatorio.',
    },
  }),
  methods: {
    openDialog(work) {
      if (work) this.work = { ...this.work, ...work, id: work.id }

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
