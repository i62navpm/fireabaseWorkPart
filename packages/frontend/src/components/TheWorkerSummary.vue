<template>
  <div class="home">
    <p>Summary</p>
    <v-btn :to="{ name: 'calendar', params: { year: '2020', month: '05' } }"
      >To a</v-btn
    >
  </div>
</template>
