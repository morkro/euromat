<template>
  <section>
    <h1>{{ $t('contact.headline') }}</h1>
    <v-markdown :source="$t('contact.content')" />
    <v-button as="a" :href="`mailto:${$root.$data.email}`">
      {{ $root.$data.email }} <feather-mail />
    </v-button>
    <v-illustration aria-hidden="true" />
  </section>
</template>

<script>
  import Illustration from './Illustration.vue'
  export default {
    name: 'Contact',

    components: {
      'v-illustration': Illustration,
      'feather-mail': () =>
        import('vue-feather-icons/icons/MailIcon' /* webpackChunkName: "icons" */),
    },
  }
</script>

<style lang="postcss" scoped>
  section {
    position: relative;

    & h1 {
      margin-bottom: var(--base-gap);
    }

    & > svg {
      margin-top: var(--base-gap);
    }

    & a {
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translate(-50%, 20%);
    }
  }
</style>
