<template>
  <progress :value="value" :max="max">
    {{ value }}
  </progress>
</template>

<script>
  export default {
    name: 'Progress',

    props: {
      value: { type: [String, Number], default: () => 0 },
      max: { type: [String, Number], default: () => 100 }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/colors";
  @import "~styles/layout";

  progress[value] {
    appearance: none;
    width: 100%;
    height: 20px;

    &::-webkit-progress-bar {
      background: $dark-blue;
      border-radius: $border-radius;
    }

    &::-webkit-progress-value {
      background: $yellow;
      border-radius: $border-radius;
    }
  }
</style>
