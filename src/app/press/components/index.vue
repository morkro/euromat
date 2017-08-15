<template>
  <section>
    <h1>{{ $t('press.headline') }}</h1>
    <p>{{ $t('press.content') }}</p>
    <i18n path="press.contact" tag="p">
      <a :href="`mailto:${$t('press.email')}`">{{ $t('press.email') }}</a>
    </i18n>
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
