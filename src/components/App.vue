<template>
  <div id="app" :class="{ 'is-embedded': isEmbedded }">
    <header v-if="!isEmbedded" class="app-header">
      <router-link :to="{ path: `/${$i18n.locale}/` }">
        <img class="header-logo" alt="EUROMAT Logo" :src="euromatLogo" height="110" />
      </router-link>

      <app-menu :main="topMenu" :languages="languages" />
    </header>

    <main id="main">
      <router-view />
    </main>

    <app-footer v-if="!isEmbedded" :menu="subMenu" :social="socialMedia" />

    <cookie-consent v-if="showConsentLayer" @cookie-consent="updateConsent" />
  </div>
</template>

<script>
  import '@/assets/icons/european-stars'
  import { GA_COOKIE_NAME, SUPPORTED_LOCALES } from '@/config'
  import { setCookie, getCookie } from '@/helper/cookies'
  import { getTranslatedUrl } from '@/i18n/helper'

  export default {
    name: 'App',

    data() {
      return {
        showConsentLayer: getCookie(GA_COOKIE_NAME) === null,
        euromatLogo: require('@/assets/svg/euromat-logo.svg'),
        languages: SUPPORTED_LOCALES.map(([locale, language]) => ({
          locale,
          language,
        })),
      }
    },

    computed: {
      topMenu() {
        return [
          {
            label: this.$t('meta.topMenu.index'),
            icon: 'home',
            route: { path: `/${this.$i18n.locale}/` },
          },
          {
            label: this.$t('meta.topMenu.faq'),
            icon: 'help-circle',
            route: { path: getTranslatedUrl('faq') },
          },
          {
            label: this.$t('meta.topMenu.about'),
            icon: 'users',
            route: { path: getTranslatedUrl('about') },
          },
          {
            label: this.$t('meta.topMenu.contact'),
            icon: 'mail',
            route: { path: getTranslatedUrl('contact') },
          },
        ]
      },
      subMenu() {
        return [
          {
            label: this.$t('meta.footerMenu.imprint'),
            route: { path: getTranslatedUrl('imprint') },
          },
          {
            label: this.$t('meta.footerMenu.privacy'),
            route: { path: getTranslatedUrl('privacy') },
          },
        ]
      },
      socialMedia() {
        return [
          {
            label: 'twitter',
            icon: 'twitter',
            message: {
              text: this.$t('meta.socialMedia.twitter'),
              hashtags: 'BTW21,EUROMAT',
            },
          },
          {
            label: 'facebook',
            icon: 'facebook',
            message: this.$t('meta.socialMedia.facebook'),
          },
          {
            label: 'clipboard',
            icon: 'clipboard',
            message: this.$t('meta.socialMedia.clipboard'),
          },
        ]
      },
      isEmbedded() {
        return this.$route.query.embedded && this.$route.query.embedded === 'iframe'
      },
    },

    beforeCreate() {
      document.querySelector('.go-to-main').textContent = this.$t('meta.skipToMain')
    },

    methods: {
      updateConsent(consent) {
        setCookie(GA_COOKIE_NAME, consent)
        this.showConsentLayer = false
      },
    },
  }
</script>

<style lang="postcss">
  @import 'normalize.css';
  @import '../styles/fonts';
  @import '../styles/layout';

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html,
  body {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  body {
    color: var(--prussian-blue);
    font-family: var(--font-roboto);
    font-weight: normal;
    font-size: var(--font-size-base);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    background-color: var(--background-primary);
    background-image: url(/img/app-background.svg);
    background-repeat: no-repeat;
    background-position: top left;
    background-size: 33vw auto;

    @media (max-width: 768px) {
      background-image: none;
    }
  }

  .go-to-main {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    border: 0;
    white-space: nowrap;
    clip-path: inset(100%);
    clip: rect(0 0 0 0);
    overflow: hidden;
    background: var(--prussian-blue);
    left: 0;
    top: 0;
    padding: calc(var(--small-gap) / 2);
    z-index: 100;
    font-weight: 500;
    font-size: var(--font-size-medium);

    &:focus {
      color: var(--white) !important;
      clip: auto;
      clip-path: none;
      height: auto;
      overflow: auto;
      position: absolute;
      width: auto;
    }
  }

  h1 {
    font-size: var(--font-size-xlarge);
    line-height: 110%;
    font-weight: 600;
    margin: 0;

    @media (max-width: 768px) {
      font-size: var(--font-size-large);
    }
  }

  h2 {
    font-size: var(--font-size-large);
    color: var(--blue-green);

    @media (max-width: 768px) {
      font-size: calc(var(--font-size-large) - 50%);
    }
  }

  p {
    line-height: 150%;
  }

  a {
    color: var(--prussian-blue);
    text-decoration: none;
    transition: color 150ms var(--ease-out-back);

    &:not(.btn):hover {
      text-decoration: underline;
      color: var(--orange);
    }

    &:not(.btn):focus {
      outline: 2px dashed var(--orange);
      color: var(--orange);
    }
  }

  ::selection {
    color: var(--prussian-blue);
    background: var(--orange);
  }

  #app {
    width: 100vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: relative;

    &.is-embedded {
      padding-top: var(--small-gap);
    }

    & header {
      width: 100%;
    }
  }

  .app-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: var(--base-gap) var(--small-gap) 0 var(--base-gap);
    margin-bottom: var(--base-gap);
    position: relative;
    z-index: 3;

    @media (max-width: 730px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: calc(var(--small-gap) - 5px);
    }
  }

  .header-logo {
    @media (max-width: 650px) {
      margin-bottom: var(--small-gap);
    }
  }

  main {
    width: 100%;
    max-width: var(--app-width);
    padding: 0 var(--small-gap);
    position: relative;
    z-index: 1;
    margin-bottom: calc(var(--base-gap) * 2);

    @media (max-width: 1050px) {
      margin-bottom: calc(var(--base-gap) * 2);
    }

    @media (max-width: 768px) {
      margin-bottom: var(--base-gap);
    }
  }
</style>
