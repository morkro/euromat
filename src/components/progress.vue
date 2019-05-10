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
  @import "~@/styles/colors";
  @import "~@/styles/layout";

  progress[value] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 100%;
    height: 60px;
    background: $dark-blue;
    color: $yellow;
    border: none;
    border-radius: $border-radius;

    &::-webkit-progress-bar {
      background: $dark-blue;
      border-radius: $border-radius;
    }

    &::-moz-progress-bar {
      background: $button-background-primary;
      border-radius: $border-radius;
      box-shadow: $button-shadow;
    }

    &::-webkit-progress-value {
      background: $button-background-primary;
      border-radius: $border-radius;
      box-shadow: $button-shadow;
    }
  }
</style>
