<template>
  <div>
    <v-worker-dialog-form ref="workerForm" @onSubmit="saveWorker" />
    <v-hover v-slot:default="{ hover }">
      <v-card
        width="220"
        height="89"
        class="fill-height"
        :elevation="hover ? 3 : 0"
        outlined
        @click="openWorkerForm"
      >
        <v-row class="fill-height" align="center" justify="center">
          <v-icon x-large>mdi-account-plus</v-icon>
        </v-row>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import VWorkerDialogForm from '@/components/VWorkerDialogForm'
import notificationMixin from '@/mixins/notification'

export default {
  components: {
    VWorkerDialogForm,
  },
  mixins: [notificationMixin],
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    openWorkerForm() {
      this.$refs.workerForm.openDialog()
    },
    async saveWorker(cb) {
      try {
        const data = JSON.parse(JSON.stringify(this.$refs.workerForm.worker))
        const createdAt = dayjs().toISOString()

        const { id } = await this.$store.dispatch('createWorker', {
          createdAt,
          ...data,
        })

        this.notifySuccess('Trabajador guardado')
        this.$router.push({
          name: 'worker',
          params: { id },
        })
      } catch {
        this.notifyError('Error al guardar')
      } finally {
        cb()
      }
    },
  },
}
</script>
