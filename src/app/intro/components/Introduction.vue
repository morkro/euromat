<template>
  <section class="intro">
    <div class="intro-content">
      <h1>{{ $t('intro.headline') }}</h1>

      <div class="intro-text">
        <v-markdown :source="$t('intro.content')" />
      </div>

      <v-button router-link as="a" :to="{ path: thesesPath }">
        {{ $t('intro.button') }}
        <feather-check-circle />
      </v-button>
    </div>
  </section>
</template>

<script>
  import { getTranslatedUrl } from '@/i18n/helper'
  export default {
    name: 'Intro',

    components: {
      'feather-check-circle': () =>
        import('vue-feather-icons/icons/CheckCircleIcon' /* webpackChunkName: "icons" */),
    },

    computed: {
      thesesPath() {
        return getTranslatedUrl('theses')
      },
    },
  }
</script>

<style lang="postcss" scoped>
  h1,
  p {
    margin-bottom: var(--base-gap);
  }

  p.small {
    font-size: var(--font-size-small);
  }

  .intro {
    position: relative;
  }

  .intro-content {
    position: relative;
    z-index: 1;
  }

  .intro-text {
    margin-bottom: var(--base-gap);
  }
</style>
