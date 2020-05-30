<template>
  <v-container>
    <v-row>
      <the-breadcrumbs />
    </v-row>
    <v-row>
      <the-workforce-carousel />
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

export default {
  components: {
    TheBreadcrumbs,
    TheWorkforceCarousel,
  },
  created() {
    this.$store.dispatch('workforceRef')
  },
}
</script>
