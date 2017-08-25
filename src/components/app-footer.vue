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
    background: transparentize($background-primary, 0.5);
    list-style: none;
    display: flex;
    font-size: $font-size-small;
    padding: $small-gap;
    border-radius: $border-radius;

    a {
      color: $text-color-secondary;
      font-weight: 600;

      &:hover {
        color: $text-color-special;
      }
    }

    li:not(:first-child) {
      margin-left: $base-gap;
    }
  }
</style>
