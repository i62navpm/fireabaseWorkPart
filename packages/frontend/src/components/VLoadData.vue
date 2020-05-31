<template>
  <v-fade-transition mode="out-in">
    <slot v-if="loading" name="loading" />
    <slot v-else />
  </v-fade-transition>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>
