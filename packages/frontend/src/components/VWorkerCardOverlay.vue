<template>
  <v-expand-transition>
    <v-overlay
      v-if="hover && worker.disabled"
      z-index="10"
      absolute
      opacity="0.5"
      color="primary"
    >
      <v-btn
        icon
        color="white"
        x-large
        :loading="loading"
        @click="enableWorker"
      >
        <v-icon>mdi-account-check</v-icon>
      </v-btn>
    </v-overlay>
  </v-expand-transition>
</template>

<script>
import loadingMixin from '@/mixins/loading'
import notificationMixin from '@/mixins/notification'

export default {
  mixins: [loadingMixin, notificationMixin],
  props: {
    worker: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    hover: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  methods: {
    async enableWorker() {
      this.startLoading()
      try {
        const { id } = this.worker
        const disabled = false

        await this.$store.dispatch('updateWorker', {
          id,
          data: { disabled },
        })

        this.notifySuccess('Trabajador desbloqueado')
        this.$router.push({
          name: 'worker',
          params: { id },
        })
      } catch {
        this.notifyError('Error al desbloquear')
      } finally {
        this.stopLoading()
      }
    },
  },
}
</script>
