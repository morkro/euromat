<template>
  <section>
    <h1>{{ $t('glossary.headline') }}</h1>
    <p>{{ $t('glossary.content')  }}</p>
  </section>
</template>

<script>
  export default {
    name: 'Glossary'
  }
</script>

<style lang="scss" scoped>
  @import "~styles/layout";

  h1,
  p {
    margin-bottom: $base-gap;
  }
</style>
