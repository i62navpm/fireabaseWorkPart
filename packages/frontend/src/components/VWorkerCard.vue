<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      :elevation="hover ? 3 : active ? 5 : 0"
      :to="{ name: 'worker', params: { id: worker.id } }"
      width="300"
      height="116"
      outlined
    >
      <v-fade-transition mode="out-in">
        <v-row class="fill-height" align="center" justify="center">
          <v-col v-if="loading">
            <slot name="loading" />
          </v-col>

          <v-col v-else>
            <v-list-item three-line>
              <v-list-item-avatar>
                <v-img :src="avatarUrl" :alt="worker.name"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">
                  {{ worker.name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ worker.description }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-fade-transition>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    worker: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    loading: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    avatarUrl() {
      return `https://avatars.dicebear.com/api/male/${this.worker.id}.svg`
    },
  },
}
</script>
