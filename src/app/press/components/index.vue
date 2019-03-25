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
    name: 'Presse',

    components: {
      'feather-mail': () =>
        import('vue-feather-icons/icons/MailIcon' /* webpackChunkName: "icons" */)
    }
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
