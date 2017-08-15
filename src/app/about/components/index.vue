<template>
  <section>
    <h1>{{ $t('about.headline') }}</h1>
    <p>{{ $t('about.content')  }}</p>
  </section>
</template>

<script>
  export default {
    name: 'About'
  }
</script>

<style lang="scss" scoped>
  @import "~styles/layout";

  h1,
  p {
    margin-bottom: $base-gap;
  }
</style>
