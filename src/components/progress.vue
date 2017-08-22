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
    background: $dark-blue;
    color: $yellow;
    border: none;
    border-radius: $border-radius;

    &::-webkit-progress-bar {
      background: $dark-blue;
      border-radius: $border-radius;
    }

    &::-webkit-progress-value {
      background: linear-gradient(90deg, $yellow, $orange);
      border-radius: $border-radius;
      box-shadow: 0 5px 34px transparentize($yellow, 0.6);
    }
  }
</style>
