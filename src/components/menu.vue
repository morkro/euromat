<template>
  <aside class="menu">
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

    <ul class="sub-menu">
      <li v-for="item of sub">
        <router-link tag="a" class="btn btn-small btn-txt" :to="item.route">
          {{ item.label }}
        </router-link>
      </li>
    </ul>

    <ul style="display:none;">
      <li v-for="item of socialMedia">
        <button>
          {{ item.label }}
        </button>
      </li>
    </ul>
  </aside>
</template>

<script>
  const getDefaultMenu = () => (
    { label: 'Index', route: { path: '/' } }
  )

  export default {
    name: 'Menu',

    props: {
      main: { type: Array, default: () => [getDefaultMenu()] },
      sub: { type: Array, default: () => [getDefaultMenu()] },
      languages: { type: Array, default: () => [] },
      socialMedia: { type: Array, default: () => [] }
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

  .menu {
    margin-right: $base-gap * 2;
    position: relative;
    flex: 0 0 140px;

    ul {
      list-style: none;
    }
  }

  .top-menu {
    text-align: right;
    background: $background-secondary;
    border-radius: $border-radius;
    padding: 4px;
    width: 100%;
    box-shadow: 0 0 22px $dark-blue;

    li:not(:last-child) {
      margin-bottom: 3px;
    }
  }

  a {
    text-decoration: none;
    font-weight: 600;
    color: $blue;
    border: 3px solid $blue;
    border-radius: $border-radius;
    padding: 10px 20px;
    display: block;
  }

  .sub-menu {
    margin-top: $base-gap / 2;
    color: $text-color-base;
    font-weight: 500;
    font-size: 85%;
    text-align: center;

    li:not(:last-child) {
      margin-bottom: $small-gap;
    }

    a:hover {
      color: $text-color-special !important;
    }
  }

  .menu-language {
    margin-top: $base-gap / 2;
    background: $dark-blue;
    padding: 5px;
    border-radius: $border-radius;
    display: flex;
    justify-content: space-around;

    button {
      padding: 10px;
      font-size: 25px;
      display: flex;
      align-items: center;
    }
  }
</style>
