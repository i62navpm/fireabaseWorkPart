<template>
  <div>
    <v-worker-dialog-form ref="workerForm" @onSubmit="saveWorker" />
    <v-hover v-slot:default="{ hover }">
      <v-card
        width="300"
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
import VWorkerDialogForm from '@/components/VWorkerDialogForm'
import dayjs from 'dayjs'

export default {
  components: {
    VWorkerDialogForm,
  },
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

        this.$router.push({
          name: 'worker',
          params: { id },
        })
      } finally {
        cb()
      }
    },
  },
}
</script>
