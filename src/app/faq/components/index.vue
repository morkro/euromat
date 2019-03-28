<template>
  <section>
    <h1>{{ $t('faq.headline') }}</h1>
    <ul>
      <li v-for="question of $t('faq.questions')" :key="question.title + question.answer">
        <h2>{{ question.title }}</h2>
        <v-markdown :source="question.answer" />
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    name: 'FAQ'
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/layout";

  h1 {
    margin-bottom: $base-gap;
  }

  ul {
    list-style: none;

    li:not(:last-child) {
      margin-bottom: $base-gap * 2;
    }
  }

  h2 {
    margin-bottom: $small-gap;
  }
</style>
