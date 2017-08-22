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
        {{ lang.label }}
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Menu',

    props: {
      main: { type: Array, default: () => [{ label: 'Index', route: { path: '/' } }] },
      languages: { type: Array, default: () => [] }
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
  @import "~styles/colors";
  @import "~styles/layout";

  .app-menu {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  ul {
    list-style: none;
  }

  .top-menu {
    text-align: right;
    width: 100%;
    display: flex;

    li:not(:last-child) {
      margin-bottom: 3px;
    }
  }

  a {
    text-decoration: none;
    font-weight: 600;
    border: 3px solid $button-background;
    border-radius: $border-radius;
    padding: 10px 20px;
    display: block;
  }

  .menu-language {
    display: flex;
    justify-content: space-around;

    button {
      font-size: 25px;
    }
  }
</style>
