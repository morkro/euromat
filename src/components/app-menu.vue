<template>
  <div class="app-menu">
    <ul class="top-menu">
      <li v-for="item of main">
        <router-link tag="a" :to="item.route">
          {{ item.label }}
        </router-link>
      </li>
    </ul>

    <div class="menu-language">
      <button
        class="btn-txt"
        v-for="lang of languages"
        type="button"
        @click="changeLanguage(lang.locale)">
        <img :src="lang.icon" :width="buttonSize" :height="buttonSize" :alt="lang.locale" />
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AppMenu',

    props: {
      main: { type: Array, default: () => [{ label: 'Index', route: { path: '/' } }] },
      languages: { type: Array, default: () => [] }
    },

    data () {
      return {
        buttonSize: 20
      }
    },

    methods: {
      changeLanguage (locale) {
        this.$i18n.locale = locale
        localStorage.setItem('euromat-locale', locale)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/animations";
  @import "~styles/colors";
  @import "~styles/layout";

  $language-btn-size: 45px;

  .app-menu {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    @media (max-width: 480px) {
      flex-direction: column;
    }
  }

  ul {
    list-style: none;
  }

  .top-menu {
    text-align: right;
    width: 100%;
    display: flex;

    @media (max-width: 480px) {
      margin-bottom: $small-gap + 5;

      li:last-child {
        margin-right: 0;
      }
    }

    li {
      margin-right: $base-gap;
    }
  }

  a {
    text-decoration: none;
    font-weight: 600;
    display: block;
  }

  .menu-language {
    display: flex;
    justify-content: space-around;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 5px;
      background: rgba(0, 0, 0, 0.1);
      border-radius: 100%;
      width: $language-btn-size;
      height: $language-btn-size;
      transition: background 150ms $easeOutBack;

      &:hover {
        background: rgba(0, 0, 0, 0.15);
      }

      &:focus {
        box-shadow: none;
        background: $button-background-secondary;
      }
    }

    img {
      margin: 0 auto;
    }
  }
</style>
