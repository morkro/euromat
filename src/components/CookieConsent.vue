<template>
  <section id="analytics-consent">
    <div class="consent-content">
      <p>{{ $t('meta.cookieConsent.text') }}</p>
      <div class="consent-actions">
        <button @click="updateConsent(false)">
          {{ $t('meta.cookieConsent.btnDecline') }}
        </button>
        <button @click="updateConsent(true)">
          {{ $t('meta.cookieConsent.btnAccept') }}
        </button>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'CookieConsent',

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
    background: var(--background-secondary);
    color: var(--text-color-secondary);
    display: flex;
    justify-content: center;
    padding: var(--small-gap);
    margin-bottom: var(--base-gap);
    border-radius: var(--border-radius);
    box-shadow: var(--button-shadow);

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
  }
</style>
