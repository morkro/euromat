<template>
  <div id="app">
    <header class="app-header">
      <router-link :to="{ path: '/' }">
        <img class="header-logo" :src="euromatLogo" width="90" height="90" />
      </router-link>

      <app-menu :main="topMenu" :languages="languages" />
    </header>

    <main>
      <router-view></router-view>
    </main>

    <footer>
      <app-footer :menu="subMenu" :social="socialMedia" />
    </footer>

    <div class="app-background">
      <svgicon
        name="european-stars"
        width="10em"
        height="10em"
        scale="8"
        color="#fee872" />
    </div>
  </div>
</template>

<script>
  import AppMenu from '@/components/app-menu'
  import AppFooter from '@/components/app-footer'
  import '@/assets/icons/european-stars'

  export default {
    name: 'App',

    components: {
      'app-menu': AppMenu,
      'app-footer': AppFooter
    },

    i18n: {
      messages: {
        de: {
          topMenu: {
            index: 'Startseite',
            about: 'Über uns',
            faq: 'FAQ',
            press: 'Presse'
          },
          subMenu: {
            imprint: 'Impressum',
            privacy: 'Datenschutz'
          }
        },
        en: {
          topMenu: {
            index: 'Landing page',
            about: 'About us',
            faq: 'FAQ',
            press: 'Press'
          },
          subMenu: {
            imprint: 'Imprint',
            privacy: 'Data privacy'
          }
        }
      }
    },

    data () {
      return {
        euromatLogo: require('@/assets/svg/euromat-logo.svg'),
        languages: [
          { icon: require('@/assets/svg/flag-de.svg'), locale: 'de' },
          { icon: require('@/assets/svg/flag-uk.svg'), locale: 'en' }
        ],
        socialMedia: [
          { label: 'Twitter', icon: 'twitter' },
          { label: 'Facebook', icon: 'facebook' },
          { label: 'Clipboard', icon: 'clipboard' }
        ]
      }
    },

    computed: {
      isGermanLocale () {
        return this.$i18n.locale === 'de'
      },
      topMenu () {
        return [
          {
            label: this.$t('topMenu.index'),
            route: { path: '/' }
          },
          {
            label: this.$t('topMenu.about'),
            route: { path: this.isGermanLocale ? '/über-uns' : '/about-us' }
          },
          {
            label: this.$t('topMenu.faq'),
            route: { path: '/faq' }
          },
          {
            label: this.$t('topMenu.press'),
            route: { path: this.isGermanLocale ? '/presse' : '/press' }
          }
        ]
      },
      subMenu () {
        return [
          {
            label: this.$t('subMenu.imprint'),
            route: { path: this.isGermanLocale ? '/impressum' : '/imprint' }
          },
          {
            label: this.$t('subMenu.privacy'),
            route: { path: this.isGermanLocale ? '/datenschutz' : '/privacy' }
          }
        ]
      }
    }
  }
</script>

<style lang="scss">
  @import "~node_modules/normalize.css/normalize";
  @import "~styles/animations";
  @import "~styles/fonts";
  @import "~styles/buttons";
  @import "~styles/colors";
  @import "~styles/layout";

  $app-width: 930px;

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
    background: $background-primary;
    color: $text-color-base;
    font-family: $fontHalisGR;
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
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.06);
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
    transition: color 150ms $easeInOutQuint;

    &:not(.btn):hover {
      color: $text-color-special;
    }
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

    @media (max-width: 768px) {
      position: static;
      justify-content: center;
      margin-top: $base-gap;
    }
  }

  .app-background {
    display: none;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;

    svg {
      position: absolute;
      top: 0;
      transform: translate(-65%, -53%);
    }
  }
</style>
