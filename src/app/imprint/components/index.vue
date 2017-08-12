<template>
  <section>
    <h1>{{ $t('headline') }}</h1>
    <p>Content to be written.</p>
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
