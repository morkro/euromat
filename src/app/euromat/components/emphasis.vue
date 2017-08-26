<template>
  <section>
    <h1>{{ $t('euromat.emphasis.headline') }}</h1>
    <p>{{ $t('euromat.emphasis.content') }}</p>

    <ol class="thesis-list">
      <li v-for="thesis of theses">
        <input
          :name="`thesis-${thesis.id}`"
          :id="`thesis-${thesis.id}`"
          type="checkbox"
          @click.self="addThesisEmphasis(thesis, $event)"/>
        <label :for="`thesis-${thesis.id}`">
          <span>{{ getThesisCategory(thesis.category) }}</span>
          {{ getThesisTitle(thesis.thesis) }}
        </label>
      </li>
    </ol>

    <div class="emphasis-controls">
      <button type="button" @click="submitEmphasis()">
        {{ $t('euromat.emphasis.button') }} <feather-arrow-right />
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
        sessionStorage.setItem('euromat-emphasized', JSON.stringify(this.emphasized))
        this.$router.push({ path: this.isGermanLocale
          ? '/thesen/ergebnis'
          : '/theses/results'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/animations";
  @import "~styles/colors";
  @import "~styles/layout";

  $input-size: 40px;
  $breakpoint: 768px;

  h1,
  p {
    margin-bottom: $base-gap;
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
        transform 150ms $easeInOutQuint,
        opacity 200ms $easeInOutQuint;
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
        transform 150ms $easeInOutQuint,
        opacity 200ms $easeInOutQuint;
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
