<template>
  <v-avatar :class="{ primary: !user.photoURL }" size="32">
    <v-img v-if="user.photoURL" :src="user.photoURL" :alt="user.displayName" />
    <span v-else class="white--text">{{ initialCharacterName }}</span>
  </v-avatar>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  computed: {
    initialCharacterName() {
      return this.user.displayName.charAt(0).toUpperCase()
    },
  },
}
</script>

<style lang="scss" scoped>
.v-avatar {
  cursor: pointer;
}
</style>
