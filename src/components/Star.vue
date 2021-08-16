<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 25">
    <path
      :fill="`var(--${color})`"
      fill-rule="evenodd"
      d="M19.023 15.153l3.335 9.384-8.214-5.596-7.893 6.13 2.817-9.588L.855 9.888l9.954-.33 2.818-9.589 3.335 9.384 9.955-.33z"
    />
  </svg>
</template>

<script>
  import { defineComponent } from '@vue/composition-api'

  const colors = [
    'white',
    'black',
    'prussian-blue',
    'blue-green',
    'cornflower-blue',
    'light-blue',
    'orange',
    'honey-yellow',
  ]

  export default defineComponent({
    name: 'VStar',
    props: {
      color: {
        type: String,
        default: colors[0],
        validator: (v) => colors.includes(v),
      },
    },
    setup() {
      return {}
    },
  })
</script>

<style scoped>
  svg {
    width: 25px;
    height: 25px;
  }
</style>
