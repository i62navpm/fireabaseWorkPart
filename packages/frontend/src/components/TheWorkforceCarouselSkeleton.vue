<template>
  <v-slide-group show-arrows>
    <v-slide-item v-for="n in 5" :key="n">
      <v-card class="ma-4" width="220" outlined>
        <v-list-item class="px-0">
          <v-list-item-content class="py-2">
            <v-skeleton-loader type="list-item-avatar-two-line" />
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-slide-item>
  </v-slide-group>
</template>
