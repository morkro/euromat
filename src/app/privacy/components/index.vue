<template>
  <section>
    <h1>{{ $t('privacy.headline') }}</h1>
    <ul>
      <li v-for="topic of $t('privacy.topics')">
        <h2>{{ topic.title }}</h2>
        <p v-for="content of topic.content">
          {{ content }}
        </p>
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
  @import "~styles/layout";

  h1,
  p {
    margin-bottom: $base-gap;
  }

  ul {
    list-style: none;
  }

  h2 {
    margin-bottom: $small-gap;
  }
</style>
