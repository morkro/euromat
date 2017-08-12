<template>
  <aside class="menu">
    <ul>
      <li v-for="(item, index) in menu" v-if="notLastItem(index)">
        <router-link tag="a" :to="item.route">
          {{ item.label }}
        </router-link>
      </li>
    </ul>
    <router-link class="menu-impressum" :to="impressum.route">
      {{ impressum.label }}
    </router-link>
  </aside>
</template>

<script>
  export default {
    name: 'Menu',

    props: {
      menu: { type: Array, default: () => [] }
    },

    computed: {
      impressum () {
        return this.menu[this.menu.length - 1]
      }
    },

    methods: {
      notLastItem (index) {
        return index !== this.menu.length - 1
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
  }
</style>
