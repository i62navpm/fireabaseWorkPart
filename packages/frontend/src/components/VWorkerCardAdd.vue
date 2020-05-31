<template>
  <div>
    <v-worker-card-form ref="workerForm" @onSubmit="saveWorker" />
    <v-hover v-slot:default="{ hover }">
      <v-card
        width="300"
        height="116"
        :elevation="hover ? 3 : 0"
        outlined
        @click="openWorkerForm"
      >
        <v-row class="fill-height" align="center" justify="center">
          <v-icon size="48" v-text="'mdi-account-plus'" />
        </v-row>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
import VWorkerCardForm from '@/components/VWorkerCardForm'
import dayjs from 'dayjs'

export default {
  components: {
    VWorkerCardForm,
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
