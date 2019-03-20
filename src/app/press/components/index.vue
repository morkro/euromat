<template>
  <section>
    <h1>{{ $t('press.headline') }}</h1>
    <p>{{ $t('press.content') }}</p>
    <p>{{ $t('press.contact') }}</p>
    <a class="btn" :href="`mailto:${$t('press.email')}`">
      {{ $t('press.email') }} <feather-mail />
    </a>
  </section>
</template>

<script>
  export default {
    name: 'Presse'
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/layout";

  h1 {
    margin-bottom: $base-gap;
  }

  a {
    margin-top: $base-gap;
  }
</style>
