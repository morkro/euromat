<template>
  <section>
    <h1>{{ $t('partner.headline') }}</h1>
    <v-markdown :source="$t('partner.content')" />
  </section>
</template>

<script>
  export default {
    name: 'Partner'
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/colors";
  @import "~@/styles/layout";
</style>
