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
      max: { type: [String, Number], default: () => 100 },
    },
  }
</script>

<style lang="postcss" scoped>
  progress[value] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 100%;
    height: 60px;
    background: var(--white);
    color: var(--yellow);
    border: none;
    border-radius: var(--border-radius);

    &::-webkit-progress-bar {
      background: var(--white);
      border: 2px solid var(--prussian-blue);
      border-radius: var(--border-radius);
    }

    &::-moz-progress-bar {
      background: var(--orange);
      border-radius: var(--border-radius);
    }

    &::-webkit-progress-value {
      background: var(--orange);
      border-radius: var(--border-radius);
    }
  }
</style>
