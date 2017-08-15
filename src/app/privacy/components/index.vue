<template>
  <section>
    <h1>{{ $t('privacy.headline') }}</h1>
    <p>{{ $t('privacy.content')  }}</p>
  </section>
</template>

<script>
  export default {
    name: 'Datenschutz'
  }
</script>

<style lang="scss" scoped>
  @import "~styles/layout";

  h1,
  p {
    margin-bottom: $base-gap;
  }
</style>
