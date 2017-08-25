<template>
  <ul class="footer-menu">
    <li v-for="item of menu">
      <router-link tag="a" :to="item.route">
        {{ item.label }}
      </router-link>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'AppFooter',

    props: {
      menu: { type: Array, default: () => [] }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/colors";
  @import "~styles/layout";

  .footer-menu {
    list-style: none;
    display: flex;
    font-size: $font-size-small;

    a {
      color: $text-color-secondary;
      font-weight: 600;
    }

    li:not(:first-child) {
      margin-left: $base-gap;
    }
  }
</style>
