<template>
  <section class="faq-page">
    <h1>{{ $t('faq.headline') }}</h1>
    <ul>
      <li v-for="question of $t('faq.questions')" :key="question.title + question.answer">
        <h2>{{ question.title }}</h2>
        <div class="faq-content">
          <v-markdown :source="question.answer" />
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    name: 'FAQ'
  }
</script>

<style lang="scss">
  @import "~@/styles/layout";

  .faq-page {
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
  }

  .faq-content ul {
    padding-left: 1.25em;
    margin-top: calc(#{$base-gap} / 2);
    list-style: circle;

    li {
      margin-bottom: calc(#{$base-gap} / 2);
    }
  }
</style>
