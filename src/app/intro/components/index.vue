<template>
  <section>
    <h1>Willkommen beim EuroMat</h1>
    <p>Content to be written.</p>
    <router-link tag="button" :to="{ path: '/thesen' }">
      Start
    </router-link>
  </section>
</template>

<script>
  export default {
    name: 'Intro'
  }
</script>

<style lang="scss" scoped>
  @import "~styles/layout";

  h1, p {
    margin-bottom: $base-gap;
  }
</style>
