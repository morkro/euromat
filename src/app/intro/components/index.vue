<template>
  <section class="intro">
    <div class="intro-content">
      <h1>{{ $t('intro.headline') }}</h1>

      <div class="intro-text">
        <v-markdown :source="$t('intro.content')" />
      </div>

      <router-link class="btn" :to="{ path: thesesPath }">
        {{ $t('intro.button') }}
        <feather-check-circle />
      </router-link>
    </div>
  </section>
</template>

<script>
  import { getTranslatedUrl } from '@/i18n/helper'
  export default {
    name: 'Intro',

    components: {
      'feather-check-circle': () =>
        import('vue-feather-icons/icons/CheckCircleIcon' /* webpackChunkName: "icons" */)
    },

    computed: {
      thesesPath () {
        return getTranslatedUrl('theses')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/layout";

  h1,
  p {
    margin-bottom: $base-gap;
  }

  p.small {
    font-size: $font-size-small;
  }

  .intro {
    position: relative;
  }

  .intro-content {
    position: relative;
    z-index: 1;
  }

  .intro-text {
    margin-bottom: $base-gap;
  }
</style>
