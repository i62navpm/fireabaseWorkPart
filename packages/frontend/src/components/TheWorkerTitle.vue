<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-img :src="avatarUrl" :alt="worker.name"></v-img>
    </v-list-item-avatar>
    <v-list-item-title class="headline mb-1">
      {{ worker.name }}
    </v-list-item-title>
    <v-list-item-action>
      <v-btn icon>
        <v-icon>mdi-account-edit</v-icon>
      </v-btn>
    </v-list-item-action>
    <v-list-item-action>
      <v-btn icon>
        <v-icon>mdi-account-cancel</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  props: {
    worker: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  computed: {
    avatarUrl() {
      return `https://avatars.dicebear.com/api/male/${this.worker.id}.svg`
    },
  },
}
</script>
