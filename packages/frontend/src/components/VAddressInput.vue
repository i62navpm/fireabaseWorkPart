<template>
  <v-text-field
    id="searchTextField"
    name="address"
    label="Dirección"
    placeholder=""
    :value="value"
    @input="changeInput"
  ></v-text-field>
</template>

<script>
export default {
  props: {
    value: {
      required: true,
      type: String,
      default: '',
    },
  },
  mounted() {
    const input = document.getElementById('searchTextField')
    const options = {
      types: ['address'],
      fields: ['formatted_address'],
      componentRestrictions: { country: 'es' },
    }

    const autocomplete = new google.maps.places.Autocomplete(input, options)
    autocomplete.addListener('place_changed', () =>
      this.changeInput(autocomplete.getPlace().formatted_address)
    )
  },
  methods: {
    changeInput(value) {
      this.$emit('input', value)
    },
  },
}
</script>
