<template>
  <section>
    <h1>{{ $t('press.headline') }}</h1>
    <p>{{ $t('press.content') }}</p>
  </section>
</template>

<script>
  export default {
    name: 'Presse'
  }
</script>

<style lang="scss" scoped>
  @import "~styles/layout";

  h1 {
    margin-bottom: $base-gap;
  }
</style>
