<template>
  <section>
    <h1>{{ $t('fourzerofour.headline') }}</h1>
    <v-markdown :source="$t('fourzerofour.content')" />
    <router-link class="btn" :to="{ path: '/' }">
      {{ $t('fourzerofour.button') }}
    </router-link>
  </section>
</template>

<script>
  export default {
    name: 'FourZeroFour',
  }
</script>

<style lang="postcss" scoped>
  h1,
  p {
    margin-bottom: var(--base-gap);
  }
</style>
