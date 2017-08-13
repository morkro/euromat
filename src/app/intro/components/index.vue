<template>
  <section>
    <h1>{{ $t('intro.headline') }}</h1>
    <p>{{ $t('intro.content') }}</p>
    <router-link class="btn" :to="{ path: '/thesen' }">
      {{ $t('intro.button') }}
    </router-link>
  </section>
</template>

<script>
  export default {
    name: 'Intro'
  }
</script>

<style lang="scss" scoped>
  @import "~styles/layout";

  h1,
  p {
    margin-bottom: $base-gap;
  }
</style>
