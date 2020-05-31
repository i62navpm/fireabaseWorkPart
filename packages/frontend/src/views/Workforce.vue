<template>
  <v-container>
    <v-row>
      <the-breadcrumbs />
    </v-row>
    <v-row>
      <v-load-data :loading="loading">
        <template #loading>
          <the-workforce-carousel-skeleton />
        </template>
        <the-workforce-carousel
          :key="workforce.length"
          :workforce="workforce"
        />
      </v-load-data>
    </v-row>
    <v-row>
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </v-row>
  </v-container>
</template>

<script>
import TheBreadcrumbs from '@/components/TheBreadcrumbs'
import VLoadData from '@/components/VLoadData'
import TheWorkforceCarousel from '@/components/TheWorkforceCarousel'
import TheWorkforceCarouselSkeleton from '@/components/TheWorkforceCarouselSkeleton'
import loadingMixin from '@/mixins/loading.js'

export default {
  components: {
    TheBreadcrumbs,
    TheWorkforceCarousel,
    TheWorkforceCarouselSkeleton,
    VLoadData,
  },
  mixins: [loadingMixin],
  computed: {
    workforce() {
      return this.$store.getters.getWorkforce
    },
  },
  created() {
    this.startLoading()
    try {
      this.$store.dispatch('workforceRef')
    } finally {
      this.stopLoading()
    }
  },
}
</script>
