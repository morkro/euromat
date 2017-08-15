<template>
  <div id="app">
    <app-menu :main="topMenu" :sub="subMenu" :languages="languages" />
    <main>
      <router-view></router-view>
    </main>
    <div class="app-background">
      <svgicon
        name="european-stars"
        width="10em"
        height="10em"
        scale="4"
        color="black" />
    </div>
  </div>
</template>

<script>
  import Menu from '@/components/menu'
  import '@/assets/icons/european-stars'

  export default {
    name: 'App',

    components: {
      'app-menu': Menu
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
            index: 'Main page',
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
        languages: [
          { label: '🇩🇪', locale: 'de' },
          { label: '🇬🇧', locale: 'en' }
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
  @import "~styles/buttons";
  @import "~styles/colors";
  @import "~styles/layout";

  $app-width: 850px;

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
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  h1 {
    margin: 0;
  }

  a {
    color: $text-color-base;

    &:hover {
      color: $text-color-special;
    }
  }

  #app {
    max-width: $app-width;
    width: 95vw;
    display: flex;
    align-items: flex-start;
    position: relative;
    margin: $base-gap * 3 0;
  }

  main {
    background: transparentize($background-primary, 0.5);
    width: 100%;
    position: relative;
    z-index: 1;
  }

  .app-background {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;

    svg {
      position: absolute;
      top: 0;
      transform: translate(-65%, -53%);
      opacity: 0.2;
    }
  }
</style>
