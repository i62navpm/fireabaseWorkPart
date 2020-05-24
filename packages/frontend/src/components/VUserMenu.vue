<template>
  <v-menu :close-on-content-click="false" :nudge-width="200" offset-y>
    <template v-slot:activator="{ on }">
      <v-user-avatar :user="user" @click.native="on.click"></v-user-avatar>
    </template>

    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ user.displayName }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.email }} </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-user-logout-button />
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import VUserLogoutButton from '@/components/VUserLogoutButton'
import VUserAvatar from '@/components/VUserAvatar'

export default {
  components: {
    VUserLogoutButton,
    VUserAvatar,
  },
  props: {
    user: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
}
</script>
