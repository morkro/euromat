<template>
  <aside>
    <ul>
      <li v-for="item in menu">
        <router-link :to="item.route">
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

<style lang="scss" scoped></style>
