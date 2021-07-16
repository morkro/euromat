<template>
  <section id="analytics-consent">
    <div class="consent-content">
      <p>{{ $t('meta.cookieConsent.text') }}</p>
      <div class="consent-actions">
        <v-button small @click="updateConsent(false)">
          {{ $t('meta.cookieConsent.btnDecline') }}
          <feather-slash />
        </v-button>
        <v-button small @click="updateConsent(true)">
          {{ $t('meta.cookieConsent.btnAccept') }}
          <feather-smile />
        </v-button>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'CookieConsent',

    components: {
      'feather-slash': () =>
        import('vue-feather-icons/icons/SlashIcon' /* webpackChunkName: "icons" */),
      'feather-smile': () =>
        import('vue-feather-icons/icons/SmileIcon' /* webpackChunkName: "icons" */),
    },

    methods: {
      updateConsent(consent) {
        this.$emit('cookie-consent', consent)
      },
    },
  }
</script>

<style lang="postcss" scoped>
  #analytics-consent {
    position: fixed;
    z-index: 4;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    max-width: var(--app-width);
    background: var(--blue-green);
    color: var(--white);
    display: flex;
    justify-content: center;
    padding: var(--small-gap);
    margin-bottom: var(--base-gap);
    border-radius: var(--border-radius);
    border: 4px solid var(--white);

    @media (max-width: var(--app-width)) {
      margin-bottom: 0;
      border-radius: 0;
      box-shadow: 0;
      left: 0;
      transform: none;
    }

    & .consent-content {
      max-width: var(--app-width);
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      & button {
        margin-left: var(--small-gap);
      }
    }

    & .consent-actions {
      display: flex;
    }
  }
</style>
