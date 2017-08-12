<template>
  <div id="app">
    <app-menu :menu="menu" />
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

  button {
    padding: 10px 20px;
    background: $button-background;
    color: $button-color;
    border-radius: $border-radius;
    border: 2px solid $button-background;
    cursor: pointer;
    position: relative;
    transition: background 50ms, border-color 0.4s;
    transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: -2px;
      width: calc(100% + 4px);
      height: 100%;
      border-radius: $border-radius;
    }

    &::before {
      background: $yellow;
      border-radius: $border-radius;
      opacity: 0;
      z-index: -1;
      transform: scale3d(0.7, 1, 1);
      transition: transform 0.4s, opacity 0.4s;
      transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
    }

    &::after {
      background: $button-background;
      z-index: -2;
    }

    &:hover {
      background: transparent;
      border-color: $yellow;

      &::before {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }

    &:active,
    &:focus {
      outline: none;
      background: $yellow;
    }

    &.btn-txt {
      background: transparent;
      color: $text-color-base;
      border: none;

      &::before, &::after {
        content: none;
      }

      &:hover {
        color: $text-color-special;
      }
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
