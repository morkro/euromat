<template>
  <section>
    <h1>{{ $t('euromat.emphasis.headline') }}</h1>
    <p>{{ $t('euromat.emphasis.content') }}</p>

    <ol class="thesis-list">
      <li v-for="thesis of theses">
        <label :for="`thesis-${thesis.id}`">
          {{ thesis.thesis }}
        </label>
        <input
          :name="`thesis-${thesis.id}`"
          :id="`thesis-${thesis.id}`"
          type="checkbox"
          @click.self="addThesisEmphasis(thesis, $event)"/>
      </li>
    </ol>

    <div class="emphasis-controls">
      <button type="button" @click="submitEmphasis()">
        {{ $t('euromat.emphasis.button') }}
      </button>
    </div>
  </section>
</template>

<script>
  import { theses } from '@/data'

  export default {
    name: 'Emphasis',

    data () {
      return {
        theses,
        emphasized: []
      }
    },

    computed: {
      isGermanLocale () {
        return this.$i18n.locale === 'de'
      }
    },

    methods: {
      addThesisEmphasis (thesis, event) {
        if (event.target.checked) {
          this.emphasized.push({ thesis: thesis.id })
        } else {
          const index = this.emphasized.findIndex(item => item.thesis === thesis.id)
          this.emphasized.splice(index, 1)
        }
      },
      submitEmphasis () {
        localStorage.setItem('euromat-emphasized', JSON.stringify(this.emphasized))
        this.$router.push({ path: this.isGermanLocale
          ? '/thesen/ergebnis'
          : '/theses/results'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/colors";
  @import "~styles/layout";

  h1,
  p {
    margin-bottom: $base-gap;
  }

  .thesis-list {
    margin-top: $base-gap;
    list-style: decimal;

    li {
      padding-bottom: $base-gap / 2;
      display: flex;
      justify-content: space-between;
    }

    li:not(:last-child) {
      margin-bottom: $base-gap / 2;
      border-bottom: 4px solid $dark-blue;
    }

    label {
      cursor: pointer;
      flex: 0 0 90%;
    }
  }

  .emphasis-controls {
    margin-top: $base-gap;
    display: flex;
    justify-content: flex-end;
  }
</style>
