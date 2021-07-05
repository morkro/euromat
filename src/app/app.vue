<template>
  <div id="app" :class="{ 'is-embedded': isEmbedded }">
    <header v-if="!isEmbedded" class="app-header">
      <router-link :to="{ path: `/${$i18n.locale}/` }">
        <img
          class="header-logo"
          alt="EUROMAT Logo"
          :src="euromatLogo"
          :width="logoSize"
          :height="logoSize / 2"
        />
      </router-link>

      <app-menu :main="topMenu" :languages="languages" />
    </header>

    <main id="main">
      <router-view />
    </main>

    <footer v-if="!isEmbedded">
      <app-footer :menu="subMenu" :social="socialMedia" />
    </footer>

    <cookie-consent v-if="showConsentLayer" @cookie-consent="updateConsent" />
  </div>
</template>

<script>
  import '@/assets/icons/european-stars'
  import { GA_COOKIE_NAME } from '@/config/analytics'
  import { SUPPORTED_LOCALES } from '@/config'
  import { setCookie, getCookie } from '@/helper/cookies'
  import { getTranslatedUrl } from '@/i18n/helper'

  export default {
    name: 'App',

    data() {
      return {
        showConsentLayer: getCookie(GA_COOKIE_NAME) === null,
        euromatLogo: require('@/assets/svg/euromat-logo.svg'),
        logoSize: 220,
        languages: SUPPORTED_LOCALES.map(([locale, language]) => ({
          icon: require(`@/assets/svg/flag-${locale}.svg`),
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
            route: { path: `/${this.$i18n.locale}/` },
          },
          {
            label: this.$t('meta.topMenu.faq'),
            route: { path: getTranslatedUrl('faq') },
          },
          {
            label: this.$t('meta.topMenu.about'),
            route: { path: getTranslatedUrl('about') },
          },
          {
            label: this.$t('meta.topMenu.partner'),
            route: { path: getTranslatedUrl('partner') },
          },
          {
            label: this.$t('meta.topMenu.contact'),
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
              hashtags: 'BTW17,EUROMAT',
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
  @import '../styles/animations.css';
  @import '../styles/fonts';
  @import '../styles/buttons.css';
  @import '../styles/colors.css';
  @import '../styles/layout.css';

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

    &.no-scroll {
      overflow: hidden;
    }
  }

  body {
    background: var(--background-primary);
    color: var(--text-color-base);
    font-family: var(--font-assistant);
    font-weight: normal;
    font-size: var(--font-size-base);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  .visuallyhidden:not(:focus):not(:active) {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    border: 0;
    padding: 0;
    white-space: nowrap;
    clip-path: inset(100%);
    clip: rect(0 0 0 0);
    overflow: hidden;
  }

  .go-to-main.visuallyhidden {
    position: absolute;
    background: var(--background-secondary);
    left: 0;
    top: 0;
    padding: calc(#{var(--small-gap)} / 2);
    z-index: 100;

    &:focus {
      color: var(--text-color-secondary);
    }
  }

  h1 {
    font-size: var(--font-size-xlarge);
    line-height: 110%;
    font-weight: 600;
    text-shadow: var(--text-shadow);
    margin: 0;

    @media (max-width: 768px) {
      font-size: var(--font-size-large);
    }
  }

  h2 {
    font-size: var(--font-size-large);
    color: var(--text-color-secondary);

    @media (max-width: 768px) {
      font-size: calc(var(--font-size-large) - 50%);
    }
  }

  p {
    line-height: 150%;
  }

  a {
    color: var(--text-color-base);
    text-decoration: none;
    transition: color 150ms var(--ease-out-back);

    &:not(.btn):hover {
      color: var(--text-color-special);
    }

    &:not(.btn):focus {
      outline: 2px solid var(--orange);
      color: var(--text-color-special);
    }
  }

  ::selection {
    color: var(--text-color-base);
    background: var(--text-color-special);
  }

  #app {
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;

    &.is-embedded {
      padding-top: var(--small-gap);
    }

    header {
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
    z-index: 2;

    @media (max-width: 730px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: calc(var(--small-gap) - 5);
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
    margin-bottom: calc(var(--base-gap) * 3);

    @media (max-width: 1050px) {
      margin-bottom: calc(var(--base-gap) * 2);
    }

    @media (max-width: 768px) {
      margin-bottom: var(--base-gap);
    }
  }

  footer {
    position: fixed;
    z-index: 2;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: flex-end;

    @media (max-width: 1050px) {
      position: static;
      z-index: 0;
      justify-content: center;
      margin-top: var(--base-gap);
    }
  }
</style>
