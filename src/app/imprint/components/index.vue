<template>
  <section>
    <h1>{{ $t('imprint.headline') }}</h1>
    <p>{{ $t('imprint.content') }}</p>
  </section>
</template>

<script>
  export default {
    name: 'Imprint'
  }
</script>

<style lang="scss" scoped>
  @import "~styles/layout";

  h1 {
    margin-bottom: $base-gap;
  }
</style>
