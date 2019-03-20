<template>
  <section>
    <h1>{{ $t('fourzerofour.headline') }}</h1>
    <p>{{ $t('fourzerofour.content')  }}</p>
    <router-link class="btn" :to="{ path: '/' }">
      {{ $t('fourzerofour.button') }}
    </router-link>
  </section>
</template>

<script>
  export default {
    name: 'FourZeroFour'
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/layout";

  h1,
  p {
    margin-bottom: $base-gap;
  }
</style>
