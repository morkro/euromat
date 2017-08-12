<template>
  <div id="app">
    <app-menu :menu="menu" />
    <main id="app">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import Menu from '@/components/menu'
  export default {
    name: 'Eur-O-Mat',

    components: {
      'app-menu': Menu
    },

    data () {
      return {
        menu: [
          { label: 'Startseite', route: { path: '/' } },
          { label: 'FAQ', route: { path: '/faq' } },
          { label: 'Presse', route: { path: '/presse' } },
          { label: 'Impressum', route: { path: '/impressum' } }
        ]
      }
    }
  }
</script>

<style lang="scss">
  @import "~node_modules/normalize.css/normalize";
  @import "~styles/colors";

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
    align-items: center;
  }

  body {
    background: $background-primary;
    color: $text-color-base;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: $text-color-special;
  }

  button {
    padding: 10px 20px;
    background: $button-background;
    color: $button-color;
    border-radius: 20px;
    border: none;
    cursor: pointer;

    &:active,
    &:focus {
      outline: none;
      background: $yellow;
    }
  }

  #app {
    max-width: 650px;
    width: 95vw;
  }
</style>
