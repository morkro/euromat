<template>
  <section>
    <h1>{{ $t('glossary.headline') }}</h1>
    <ul>
      <li v-for="(item, index) in terminology">
        <h2 :id="item.id">{{ getTermLabel(index) }} <feather-link /></h2>
        <p>{{ getTermExplanation(index) }}</p>
        <a class="btn btn-dark btn-small" :href="getTermReference(index)" target="_blank">
          {{ getTermReference(index) }} <feather-external-link />
        </a>
      </li>
    </ul>
  </section>
</template>

<script>
  import { terminology } from '@/data'
  export default {
    name: 'Glossary',

    data () {
      return {
        terminology
      }
    },

    methods: {
      getTermLabel (index) {
        return this.terminology[index].label[this.$i18n.locale]
      },
      getTermExplanation (index) {
        return this.terminology[index].explanation[this.$i18n.locale]
      },
      getTermReference (index) {
        return this.terminology[index].reference[this.$i18n.locale]
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/colors";
  @import "~styles/layout";

  h1 {
    margin-bottom: $base-gap;
  }

  h2 {
    margin-bottom: $small-gap;
  }

  ul {
    list-style: none;

    li:not(:last-child) {
      margin-bottom: $base-gap;
      border-bottom: 4px solid $transparent-white;
      padding-bottom: $base-gap;
    }

    a {
      margin-top: $small-gap;
    }
  }
</style>
