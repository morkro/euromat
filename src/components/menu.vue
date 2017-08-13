<template>
  <aside class="menu">
    <ul>
      <li v-for="(item, index) in menu" v-if="notLastItem(index)">
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

    <router-link class="menu-impressum" :to="impressum.route">
      {{ impressum.label }}
    </router-link>
  </aside>
</template>

<script>
  export default {
    name: 'Menu',

    props: {
      menu: { type: Array, default: () => [] },
      languages: { type: Array, default: () => [] }
    },

    computed: {
      impressum () {
        return this.menu[this.menu.length - 1]
      }
    },

    methods: {
      notLastItem (index) {
        return index !== this.menu.length - 1
      },
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
    flex-grow: 1;
    width: 140px;

    ul {
      list-style: none;
      text-align: right;
      background: $background-secondary;
      border-radius: $border-radius;
      padding: 4px;
      width: 100%;
      box-shadow: 0px 0px 22px $dark-blue;
    }

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

  .menu-impressum {
    color: $text-color-base;
    font-weight: 500;
    font-size: 85%;
    text-align: center;

    &:hover {
      color: $text-color-special;
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
    }
  }
</style>
