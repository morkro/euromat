<template>
  <section>
    <h1>{{ $t('privacy.headline') }}</h1>
    <ul>
      <li v-for="(topic, index) of $t('privacy.topics')" :key="topic.title + index">
        <h2 v-if="index !== 0">
          {{ topic.title }}
        </h2>
        <v-markdown :source="topic.content" />
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    name: 'Datenschutz'
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/layout";

  h1 {
    margin-bottom: $base-gap;
  }

  ul {
    list-style: none;

    li {
      margin-bottom: $base-gap * 2;
    }
  }

  h2 {
    margin-bottom: $small-gap;
  }
</style>
