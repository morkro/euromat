<template>
  <div id="app">
    <app-menu :menu="menu" :languages="languages" />
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
    name: 'Eur-O-Mat',

    components: {
      'app-menu': Menu
    },

    i18n: {
      messages: {
        de: {
          menu: {
            index: 'Startseite',
            faq: 'FAQ',
            press: 'Presse',
            imprint: 'Impressum'
          }
        },
        en: {
          menu: {
            index: 'Main page',
            faq: 'FAQ',
            press: 'Press',
            imprint: 'Imprint'
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
      menu () {
        return [
          { label: this.$t('menu.index'), route: { path: '/' } },
          { label: this.$t('menu.faq'), route: { path: '/faq' } },
          { label: this.$t('menu.press'), route: { path: '/presse' } },
          { label: this.$t('menu.imprint'), route: { path: '/impressum' } }
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
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow: hidden;
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
    max-width: 750px;
    width: 95vw;
    display: flex;
    align-items: flex-start;
    position: relative;
    margin-top: $base-gap * 3;
  }

  main {
    background: transparentize($background-primary, .5);
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
      opacity: .2;
    }
  }
</style>
