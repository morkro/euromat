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
    name: 'Datenschutz',
  }
</script>

<style lang="postcss" scoped>
  h1 {
    margin-bottom: var(--base-gap);
  }

  ul {
    list-style: none;

    li {
      margin-bottom: calc(var(--base-gap) * 2);
    }
  }

  h2 {
    margin-bottom: var(--small-gap);
  }
</style>
