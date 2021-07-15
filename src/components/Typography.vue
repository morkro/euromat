<template>
  <component :is="'span'">
    <slot />
  </component>
</template>

<script>
  import { defineComponent } from '@vue/composition-api'

  export default defineComponent({
    props: {
      tag: {
        type: String,
        default: 'span',
        validator: (v) => ['span', 'p'],
      },
    },
    setup(props) {},
  })
</script>

<style lang="postcss" scoped>
</style>
