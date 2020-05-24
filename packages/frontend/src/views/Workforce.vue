<template>
  <div class="home">
    <p>A</p>
    <v-btn :to="{ name: 'Workers' }">To B</v-btn>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>
