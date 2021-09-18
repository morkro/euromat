<template>
  <section class="faq-page">
    <header>
      <h1>{{ $t('faq.headline') }}</h1>
      <v-illustration aria-hidden="true" />
    </header>
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
  import Illustration from './Illustration.vue'
  export default {
    name: 'FAQ',
    components: {
      'v-illustration': Illustration,
    },
  }
</script>

<style lang="postcss" scoped>
  .faq-page {
    & > ul {
      list-style: none;

      & > li:not(:last-child) {
        border-bottom: 2px solid var(--prussian-blue);
        margin-bottom: var(--base-gap);
        padding-bottom: var(--base-gap);
      }
    }

    & h2 {
      margin-bottom: var(--small-gap);
    }
  }

  .faq-page header {
    display: flex;
    justify-content: space-between;
    margin-bottom: calc(-1 * var(--base-gap));

    @media (max-width: 768px) {
      margin-bottom: var(--base-gap);
    }

    & > svg {
      width: 125px;
      height: aut0;

      @media (max-width: 768px) {
        width: 11vw;
        margin-left: var(--small-gap);
      }

      @media (max-width: 480px) {
        display: none;
      }
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
