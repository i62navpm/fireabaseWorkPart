<template>
  <v-autocomplete
    class="pt-0"
    :value="value"
    :items="workers"
    :search-input.sync="search"
    flat
    label="Añade más trabajadores"
    multiple
    chips
    deletable-chips
    item-text="name"
    item-value="id"
    no-data-text="No existe el trabajador"
    full-width
    @input="changeInput"
  >
    <template v-slot:selection="data">
      <v-chip v-bind="data.attrs" close @click:close="remove(data.item)">
        <v-avatar left>
          <v-img :src="getAvatarUrl(data.item.id)"></v-img>
        </v-avatar>
        {{ data.item.name }}
      </v-chip>
    </template>
    <template v-slot:item="{ item }">
      <v-list-item-avatar>
        <v-img :src="getAvatarUrl(item.id)"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{ item.name }}</v-list-item-title>
        <v-list-item-subtitle class="d-flex align-center">
          <v-icon small color="success">mdi-arrow-up-bold</v-icon>
          <span class="mr-2">{{ item.fullSalary }}€</span>
          <v-icon small color="error">mdi-arrow-down-bold</v-icon>
          <span>{{ item.halfSalary }}€</span>
        </v-list-item-subtitle>
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  props: {
    value: {
      required: true,
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      items: [],
      search: null,
    }
  },
  computed: {
    workers() {
      return this.$store.getters.getWorkforce.filter(
        ({ id }) => id !== this.$route.params.id
      )
    },
  },
  watch: {
    search(val) {
      val && this.querySelections(val)
    },
  },
  methods: {
    querySelections(v) {
      this.items = this.workers.filter((e) => e.name.includes(v))
    },
    getAvatarUrl(id) {
      return `https://avatars.dicebear.com/api/male/${id}.svg`
    },
    changeInput(workers) {
      this.$emit('input', workers)
    },
    remove(item) {
      const index = this.value.indexOf(item.id)
      if (index >= 0) this.value.splice(index, 1)
    },
  },
}
</script>
