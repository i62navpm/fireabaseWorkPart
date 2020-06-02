<template>
  <v-date-picker
    v-model="date"
    full-width
    type="month"
    elevation="0"
    outlined
  ></v-date-picker>
</template>

<script>
export default {
  props: {
    year: {
      type: String,
      required: true,
      default: '',
    },
    month: {
      type: String,
      required: true,
      default: '',
    },
  },
  computed: {
    date: {
      set(date) {
        const [year, month] = date.split('-')
        this.$router.push({ params: { year, month } })
      },
      get() {
        return `${this.year}-${this.month}`
      },
    },
  },
}
</script>

<style lang="scss" scoped>
[outlined] {
  box-shadow: none;
  border: thin solid rgba(0, 0, 0, 0.12);
}
</style>
