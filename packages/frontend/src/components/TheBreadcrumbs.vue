<template>
  <v-breadcrumbs :items="$route.name | breadcrumbs">
    <template v-slot:divider>
      <v-icon>mdi-chevron-right</v-icon>
    </template>

    <template v-slot:item="{ item }">
      <v-breadcrumbs-item :to="{ name: item.href }" exact>
        {{ item.text }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>
