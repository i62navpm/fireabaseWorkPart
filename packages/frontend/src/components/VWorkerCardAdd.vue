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
export default {
  components: {
    VWorkerCardForm,
  },
  methods: {
    openWorkerForm() {
      this.$refs.workerForm.openDialog()
    },
    saveWorker(cb) {
      console.log(this.$refs.workerForm.worker)
      cb()
    },
  },
}
</script>
