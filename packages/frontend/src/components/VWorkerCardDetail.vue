<template>
  <v-card
    :elevation="worker.disabled ? 0 : hover ? 3 : active ? 5 : 0"
    :to="{ name: 'worker', params: { id: worker.id } }"
    :disabled="worker.disabled"
    outlined
  >
    <v-fade-transition mode="out-in">
      <v-list>
        <v-list-item two-line>
          <v-list-item-avatar>
            <v-fade-transition mode="out-in">
              <v-icon v-if="worker.disabled" color="error" x-large>
                mdi-cancel
              </v-icon>
              <v-img v-else :src="avatarUrl" :alt="worker.name"></v-img>
            </v-fade-transition>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ worker.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ worker.nif }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-fade-transition>
  </v-card>
</template>

<script>
export default {
  props: {
    worker: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    active: {
      type: Boolean,
      default: false,
    },
    hover: {
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
