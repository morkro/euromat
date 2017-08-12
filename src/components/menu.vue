<template>
  <aside class="menu">
    <ul>
      <li v-for="item in menu">
        <router-link tag="a" :to="item.route">
          {{ item.label }}
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
  export default {
    name: 'Menu',

    props: {
      menu: { type: Array, default: () => [] }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/colors";
  @import "~styles/layout";

  .menu {
    margin-right: $base-gap * 2;
    position: relative;
    background: $background-secondary;
    border-radius: $border-radius;
    padding: 4px;
    flex-grow: 1;
    width: 140px;
    box-shadow: 0px 0px 22px $dark-blue;

    ul {
      list-style: none;
      text-align: right;
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
</style>
