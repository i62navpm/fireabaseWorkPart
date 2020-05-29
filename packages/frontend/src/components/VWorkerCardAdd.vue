<template>
  <v-hover v-slot:default="{ hover }">
    <v-card width="300" height="116" :elevation="hover ? 3 : 0" outlined>
      <v-row class="fill-height" align="center" justify="center">
        <v-icon size="48" v-text="'mdi-account-plus'" />
      </v-row>
    </v-card>
  </v-hover>
</template>
