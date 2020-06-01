<template>
  <v-list>
    <v-worker-dialog-form ref="workerForm" @onSubmit="updateWorker" />
    <v-list-item>
      <v-list-item-avatar>
        <v-img :src="avatarUrl" :alt="worker.name"></v-img>
      </v-list-item-avatar>
      <v-list-item-title class="headline mb-1">
        {{ worker.name }}
      </v-list-item-title>
      <v-list-item-action>
        <v-btn icon @click="openWorkerForm">
          <v-icon>mdi-account-edit</v-icon>
        </v-btn>
      </v-list-item-action>
      <v-list-item-action>
        <v-btn icon @click="disableWorker">
          <v-icon>mdi-account-cancel</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
import VWorkerDialogForm from '@/components/VWorkerDialogForm'
import loadingMixin from '@/mixins/loading'
import notificationMixin from '@/mixins/notification'

export default {
  components: {
    VWorkerDialogForm,
  },
  mixins: [loadingMixin, notificationMixin],
  props: {
    worker: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  computed: {
    avatarUrl() {
      return `https://avatars.dicebear.com/api/male/${this.worker.id}.svg`
    },
  },
  methods: {
    openWorkerForm() {
      this.$refs.workerForm.openDialog(this.worker)
    },
    closeWorkerForm() {
      this.$refs.workerForm.closeDialog()
    },
    async updateWorker(cb) {
      try {
        const data = JSON.parse(JSON.stringify(this.$refs.workerForm.worker))
        const { id } = this.worker

        await this.$store.dispatch('updateWorker', { id, data })
        this.notifySuccess('Trabajador actualizado')
      } catch {
        this.notifyError('Error al actualizar')
      } finally {
        cb()
        this.closeWorkerForm()
      }
    },
    async disableWorker() {
      this.startLoading()
      try {
        const { id } = this.worker
        const disabled = true

        await this.$store.dispatch('updateWorker', {
          id,
          data: { disabled },
        })

        this.notifyWarning('Trabajador bloqueado')
        this.$router.push({
          name: 'workforce',
        })
      } catch {
        this.notifyError('Error al bloquear')
      } finally {
        this.stopLoading()
      }
    },
  },
}
</script>
