<template>
  <v-container>
    <the-breadcrumbs />

    <v-load-data :loading="loading">
      <template #loading>
        <the-workforce-carousel-skeleton />
      </template>
      <the-workforce-carousel :key="workforce.length" :workforce="workforce" />
    </v-load-data>

    <v-fade-transition mode="out-in">
      <router-view />
    </v-fade-transition>
  </v-container>
</template>

<script>
import TheBreadcrumbs from '@/components/TheBreadcrumbs'
import VLoadData from '@/components/VLoadData'
import TheWorkforceCarousel from '@/components/TheWorkforceCarousel'
import TheWorkforceCarouselSkeleton from '@/components/TheWorkforceCarouselSkeleton'
import loadingMixin from '@/mixins/loading.js'
import notificationMixin from '@/mixins/notification'

export default {
  components: {
    TheBreadcrumbs,
    TheWorkforceCarousel,
    TheWorkforceCarouselSkeleton,
    VLoadData,
  },
  mixins: [loadingMixin, notificationMixin],
  computed: {
    workforce() {
      return this.$store.getters.getWorkforce
    },
  },
  async created() {
    this.startLoading()
    try {
      await this.$store.dispatch('workforceRef')
    } catch {
      this.notifyError('Error al obtener la plantilla')
    } finally {
      this.stopLoading()
    }
  },
}
</script>
