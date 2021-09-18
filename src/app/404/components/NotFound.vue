<template>
  <section>
    <h1>{{ $t('fourzerofour.headline') }}</h1>
    <v-markdown :source="$t('fourzerofour.content')" />
    <v-button router-link :to="{ path: '/' }">
      {{ $t('fourzerofour.button') }}
    </v-button>
    <v-illustration aria-hidden="true" />
  </section>
</template>

<script>
  import Illustration from './Illustration.vue'
  export default {
    name: 'FourZeroFour',
    components: {
      'v-illustration': Illustration,
    },
  }
</script>

<style lang="postcss" scoped>
  section {
    position: relative;
    text-align: center;

    & h1,
    & p,
    & > div {
      margin-bottom: var(--base-gap);
    }

    & button {
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translate(-50%, 20%);
    }
  }
</style>
