<template>
  <div id="app">
    <header class="app-header">
      <router-link :to="{ path: '/' }">
        <img class="header-logo"
          :src="euromatLogo"
          :width="logoSize"
          :height="logoSize / 2"
        >
      </router-link>

      <app-menu :main="topMenu" :languages="languages" />
    </header>

    <main>
      <router-view />
    </main>

    <footer>
      <app-footer :menu="subMenu" :social="socialMedia" />
    </footer>

    <cookie-consent
      v-if="showConsentLayer"
      @cookie-consent="updateConsent"
    />
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

    data () {
      return {
        showConsentLayer: getCookie(GA_COOKIE_NAME) === null,
        euromatLogo: require('@/assets/svg/euromat-logo.svg'),
        logoSize: 220,
        languages: SUPPORTED_LOCALES.map(([locale, language]) => ({
          icon: require(`@/assets/svg/flag-${locale}.svg`),
          locale,
          language
        }))
      }
    },

    computed: {
      topMenu () {
        return [
          {
            label: this.$t('meta.topMenu.index'),
            route: { path: `/${this.$i18n.locale}/` }
          },
          {
            label: this.$t('meta.topMenu.faq'),
            route: { path: getTranslatedUrl('faq') }
          },
          {
            label: this.$t('meta.topMenu.about'),
            route: { path: getTranslatedUrl('about') }
          },
          {
            label: this.$t('meta.topMenu.press'),
            route: { path: getTranslatedUrl('press') }
          }
        ]
      },
      subMenu () {
        return [
          {
            label: this.$t('meta.footerMenu.imprint'),
            route: { path: getTranslatedUrl('imprint') }
          },
          {
            label: this.$t('meta.footerMenu.privacy'),
            route: { path: getTranslatedUrl('privacy') }
          }
        ]
      },
      socialMedia () {
        return [
          {
            label: 'twitter',
            icon: 'twitter',
            message: {
              text: this.$t('meta.socialMedia.twitter'),
              hashtags: 'BTW17,EUROMAT'
            }
          },
          {
            label: 'facebook',
            icon: 'facebook',
            message: this.$t('meta.socialMedia.facebook')
          },
          {
            label: 'clipboard',
            icon: 'clipboard',
            message: this.$t('meta.socialMedia.clipboard')
          }
        ]
      }
    },

    methods: {
      updateConsent (consent) {
        setCookie(GA_COOKIE_NAME, consent)
        this.showConsentLayer = false
      }
    }
  }
</script>

<style lang="scss">
  @import "~@/../node_modules/normalize.css/normalize";
  @import "~@/styles/animations";
  @import "~@/styles/fonts";
  @import "~@/styles/buttons";
  @import "~@/styles/colors";
  @import "~@/styles/layout";

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
    background: $background-primary;
    color: $text-color-base;
    font-family: $fontAssistant;
    font-weight: normal;
    font-size: $font-size-base;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  h1 {
    font-size: $font-size-xlarge;
    line-height: 110%;
    font-weight: 600;
    text-shadow: $text-shadow;
    margin: 0;

    @media (max-width: 768px) {
      font-size: $font-size-large;
    }
  }

  h2 {
    font-size: $font-size-large;
    color: $text-color-secondary;

    @media (max-width: 768px) {
      font-size: $font-size-large - 50%;
    }
  }

  p {
    line-height: 150%;
  }

  a {
    color: $text-color-base;
    text-decoration: none;
    transition: color 150ms $easeOutBack;

    &:not(.btn):hover {
      color: $text-color-special;
    }

    &:not(.btn):focus {
      outline: none;
      color: $text-color-special;
    }
  }

  ::selection {
    color: $text-color-base;
    background: $text-color-special;
  }

  #app {
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;

    header {
      width: 100%;
    }
  }

  .app-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: $base-gap $small-gap 0 $base-gap;
    margin-bottom: $base-gap;
    position: relative;
    z-index: 2;

    @media (max-width: 650px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: $small-gap - 5;
    }
  }

  .header-logo {
    @media (max-width: 650px) {
      margin-bottom: $small-gap;
    }
  }

  main {
    width: 100%;
    max-width: $app-width;
    padding: 0 $small-gap;
    position: relative;
    z-index: 1;
    margin-bottom: $base-gap * 3;

    @media (max-width: 1050px) {
      margin-bottom: $base-gap * 2;
    }

    @media (max-width: 768px) {
      margin-bottom: $base-gap;
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
      margin-top: $base-gap;
    }
  }
</style>
