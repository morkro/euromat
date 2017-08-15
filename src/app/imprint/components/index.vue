<template>
  <section>
    <h1>{{ $t('imprint.headline') }}</h1>

    <div>
      <h2>{{ $t('imprint.address') }}</h2>
    </div>

    <div>
      <h2>{{ $t('imprint.address') }}</h2>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'Imprint'
  }
</script>

<style lang="scss" scoped>
  @import "~styles/layout";

  h1 {
    margin-bottom: $base-gap;
  }
</style>
