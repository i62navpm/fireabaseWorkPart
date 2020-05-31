<template>
  <v-container>
    <v-row>
      <the-breadcrumbs />
    </v-row>
    <v-row>
      <the-workforce-carousel
        :key="workforce.length"
        :workforce="workforce"
        :loading="loading"
      />
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
import TheWorkforceCarousel from '@/components/TheWorkforceCarousel'
import loadingMixin from '@/mixins/loading.js'

export default {
  components: {
    TheBreadcrumbs,
    TheWorkforceCarousel,
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
