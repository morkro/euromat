<template>
  <section>
    <h1>{{ $t('press.headline') }}</h1>
    <v-markdown :source="$t('press.content')" />
    <a class="btn" href="mailto:hello@euromat.info">
      hello@euromat.info <feather-mail />
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
