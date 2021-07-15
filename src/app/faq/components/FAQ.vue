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
    name: 'FAQ',
  }
</script>

<style lang="postcss">
  .faq-page {
    & h1 {
      margin-bottom: var(--base-gap);
    }

    & > ul {
      list-style: none;

      & > li:not(:last-child) {
        border-bottom: 2px solid var(--cornflower-blue);
        margin-bottom: var(--base-gap);
        padding-bottom: var(--base-gap);
      }
    }

    & h2 {
      margin-bottom: var(--small-gap);
    }
  }

  .faq-content ul {
    padding-left: 1.25em;
    margin-top: calc(var(--base-gap) / 2);
    list-style: circle;

    & li {
      margin-bottom: calc(var(--base-gap) / 2);
    }
  }
</style>
