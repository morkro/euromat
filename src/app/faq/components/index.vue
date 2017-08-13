<template>
  <section>
    <h1>{{ $t('faq.headline') }}</h1>
    <p>{{ $t('faq.content') }}</p>
  </section>
</template>

<script>
  export default {
    name: 'FAQ'
  }
</script>

<style lang="scss" scoped>
  @import "~styles/layout";

  h1 {
    margin-bottom: $base-gap;
  }
</style>
