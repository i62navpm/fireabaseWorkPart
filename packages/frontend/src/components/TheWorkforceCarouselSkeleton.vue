<template>
  <v-slide-group show-arrows>
    <v-slide-item v-for="n in 5" :key="n">
      <v-card class="ma-4" width="300" height="116" outlined>
        <v-skeleton-loader type="list-item-avatar-three-line" />
      </v-card>
    </v-slide-item>
  </v-slide-group>
</template>
