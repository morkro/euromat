<template>
  <section>
    <router-link :to="{ path: '/thesen/ergebnis' }">
      {{ $t('party.back') }}
    </router-link>

    <h1>Partei {{ $route.params.token }}</h1>
  </section>
</template>

<script>
  export default {
    name: 'Party'
  }
</script>

<style lang="scss" scoped>
  @import "~styles/layout";
</style>
