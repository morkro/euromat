<template>
  <section>
    <h1>{{ $t('intro.headline') }}</h1>

    <p v-for="txt of $t('intro.content')">
      {{ txt }}
    </p>

    <router-link class="btn" :to="{ path: thesesPath }">
      {{ $t('intro.button') }}
    </router-link>
  </section>
</template>

<script>
  export default {
    name: 'Intro',

    computed: {
      thesesPath () {
        return this.$i18n.locale === 'de'
          ? '/thesen'
          : '/theses'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/layout";

  h1,
  p {
    margin-bottom: $base-gap;
  }
</style>
