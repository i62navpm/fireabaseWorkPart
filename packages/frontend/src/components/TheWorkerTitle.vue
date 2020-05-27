<template>
  <v-toolbar flat>
    <v-toolbar-title>
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="avatarUrl" :alt="worker.name"></v-img>
        </v-list-item-avatar>
        <v-list-item-title class="headline mb-1">
          {{ worker.name }}
        </v-list-item-title>
      </v-list-item>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-account-edit</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-account-cancel</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import loadingMixin from '@/mixins/loading.js'

export default {
  mixins: [loadingMixin],
  data: () => ({
    worker: {
      id: '1',
      name: 'Valdemar Tellesson',
      description: 'Blister (nonthermal), right ankle',
    },
  }),
  computed: {
    avatarUrl() {
      return `https://avatars.dicebear.com/api/male/${this.worker.id}.svg`
    },
  },
}
</script>
