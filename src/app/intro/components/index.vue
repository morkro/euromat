<template>
  <section>
    <h1>Willkommen beim EuroMat</h1>
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

<style lang="scss" scoped></style>
