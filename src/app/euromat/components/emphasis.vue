<template>
  <section>
    <h1>{{ $t('emphasis.headline') }}</h1>

    <div class="emphasis-content">
      <p>{{ $t('emphasis.content') }}</p>
      <button type="button"
        class="btn-dark btn-small"
        @click="submitEmphasis()"
      >
        {{ $t('emphasis.skip') }}
        <feather-corner-up-right />
      </button>
    </div>

    <ol class="thesis-list">
      <li v-for="thesis of theses" :key="thesis.id">
        <input
          :id="`thesis-${thesis.id}`"
          :name="`thesis-${thesis.id}`"
          type="checkbox"
          @click.self="addThesisEmphasis(thesis, $event)"
        >
        <label :for="`thesis-${thesis.id}`">
          <span>{{ getThesisCategory(thesis.category) }}</span>
          {{ getThesisTitle(thesis.thesis) }}
        </label>
      </li>
    </ol>

    <div class="emphasis-controls">
      <button type="button" @click="submitEmphasis()">
        {{ $t('emphasis.button') }} <feather-arrow-right />
      </button>
    </div>
  </section>
</template>

<script>
  import { theses } from '@/data'
  import { getTranslatedUrl } from '@/i18n/helper'

  export default {
    name: 'Emphasis',

    components: {
      'feather-arrow-right': () =>
        import('vue-feather-icons/icons/ArrowRightIcon' /* webpackChunkName: "icons" */),
      'feather-corner-up-right': () =>
        import('vue-feather-icons/icons/CornerUpRightIcon' /* webpackChunkName: "icons" */)
    },

    data () {
      return {
        theses,
        emphasized: []
      }
    },

    created () {
      if (this.$browser.supports('sessionStorage')) {
        if (!sessionStorage.getItem('euromat-answers')) {
          this.$router.push({ path: getTranslatedUrl('theses') })
        }
      } else if (this.$root.$data.backupStorage.answers === undefined) {
        this.$router.push({ path: getTranslatedUrl('theses') })
      }
    },

    methods: {
      getThesisCategory (category) {
        return category[this.$i18n.locale]
      },
      getThesisTitle (thesis) {
        return thesis[this.$i18n.locale]
      },
      addThesisEmphasis (thesis, event) {
        if (event.target.checked) {
          this.emphasized.push({ thesis: thesis.id })
        } else {
          const index = this.emphasized.findIndex(item => item.thesis === thesis.id)
          this.emphasized.splice(index, 1)
        }
      },
      submitEmphasis () {
        const emphasized = JSON.stringify(this.emphasized)

        if (this.$browser.supports('sessionStorage')) {
          sessionStorage.setItem('euromat-emphasized', emphasized)
        } else {
          this.$root.$data.backupStorage.emphasized = emphasized
        }

        this.$router.push({
          path: getTranslatedUrl('results', getTranslatedUrl('theses', null, true))
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/animations";
  @import "~@/styles/colors";
  @import "~@/styles/layout";

  $input-size: 40px;
  $breakpoint: 768px;

  h1 {
    margin-bottom: $base-gap;
  }

  .emphasis-content {
    margin-bottom: $base-gap;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    button {
      flex: 0 0 auto;
      margin-left: $base-gap;
    }
  }

  .thesis-list {
    margin-top: $base-gap;
    list-style: decimal;
    counter-reset: emphasis;

    li {
      padding-bottom: $base-gap;
      display: flex;
      justify-content: space-between;
      position: relative;

      &::before {
        counter-increment: emphasis;
        content: counter(emphasis) ".";
        position: absolute;
        top: 50%;
        transform: translateY(-85%);
        color: $text-color-secondary;
        font-size: $font-size-large;
        font-weight: 600;
      }

      @media (max-width: $breakpoint) {
        flex-direction: column;

        &::before {
          top: 0;
          transform: translateY(0);
        }
      }
    }

    li:not(:last-child) {
      margin-bottom: $base-gap;

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 100vw;
        height: 4px;
        background: linear-gradient(90deg, $transparent-white);
      }
    }
  }

  input {
    opacity: 0;
    width: $input-size;
    height: $input-size;
    margin-right: $base-gap;
    margin-left: $base-gap * 2;

    &:checked + label::after {
      opacity: 1;
      transform: translate(-70px, -50%);
      transition:
        transform 150ms $easeOutBack,
        opacity 200ms $easeOutBack;
    }

    @media (max-width: $breakpoint) {
      margin-bottom: $small-gap / 2;

      &:checked + label::after {
        transform: translate(60px, -125%);
      }
    }
  }

  label {
    cursor: pointer;
    flex: 1;
    position: relative;
    font-weight: 600;

    &::after,
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate(-70px, -50%);
      border-radius: 100%;
      width: $input-size;
      height: $input-size;
    }

    &::after {
      opacity: 0;
      background: $button-background-primary;
      box-shadow: $button-shadow;
      transform: translate(-70px, -47%);
      transition:
        transform 150ms $easeOutBack,
        opacity 200ms $easeOutBack;
    }

    &::before {
      background: $dark-blue;
    }

    span {
      color: $text-color-secondary;
      display: block;
      margin-bottom: $small-gap / 2;
    }

    @media (max-width: $breakpoint) {
      &::after,
      &::before {
        top: 0;
        transform: translate(60px, -125%);
      }
    }
  }

  .emphasis-controls {
    margin-top: $base-gap;
    display: flex;
    justify-content: flex-start;
  }
</style>
