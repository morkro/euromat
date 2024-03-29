<template>
  <section>
    <h1>{{ $t('emphasis.headline') }}</h1>

    <div class="emphasis-content">
      <p>{{ $t('emphasis.content') }}</p>
      <div>
        <v-button type="button" small dark @click="submitEmphasis()">
          {{ $t('emphasis.skip') }}
          <feather-corner-up-right />
        </v-button>
        <v-button type="button" @click="submitEmphasis()">
          {{ $t('emphasis.button') }} <feather-arrow-right />
        </v-button>
      </div>
    </div>

    <ol class="thesis-list">
      <li v-for="thesis of theses" :key="thesis.id">
        <input
          :id="`thesis-${thesis.id}`"
          :name="`thesis-${thesis.id}`"
          type="checkbox"
          @click.self="addThesisEmphasis(thesis, $event)"
        />
        <label :for="`thesis-${thesis.id}`">
          <span>
            <strong>{{ getThesisCategory(thesis.category) }}</strong>
          </span>
          {{ getThesisTitle(thesis.thesis) }}
        </label>
      </li>
    </ol>

    <div class="emphasis-controls">
      <v-button type="button" small dark @click="submitEmphasis()">
        {{ $t('emphasis.skip') }}
        <feather-corner-up-right />
      </v-button>
      <v-button type="button" @click="submitEmphasis()">
        {{ $t('emphasis.button') }} <feather-arrow-right />
      </v-button>
    </div>
  </section>
</template>

<script>
  import { theses } from '@/data'
  import { getTranslatedUrl } from '@/i18n/helper'
  import { getScoreResultString } from '../scoring'

  export default {
    name: 'Emphasis',

    components: {
      'feather-arrow-right': () =>
        import('vue-feather-icons/icons/ArrowRightIcon' /* webpackChunkName: "icons" */),
      'feather-corner-up-right': () =>
        import('vue-feather-icons/icons/CornerUpRightIcon' /* webpackChunkName: "icons" */),
    },

    data() {
      return {
        theses,
        emphasized: [],
      }
    },

    computed: {
      isEmbedded() {
        return this.$route.query.embedded && this.$route.query.embedded === 'iframe'
      },
    },

    created() {
      if (this.$browser.supports('sessionStorage')) {
        if (!sessionStorage.getItem('euromat-answers')) {
          this.$router.push({ path: getTranslatedUrl('theses') })
        }
      } else if (this.$root.$data.backupStorage.answers === undefined) {
        this.$router.push({ path: getTranslatedUrl('theses') })
      }
    },

    methods: {
      getThesisCategory(category) {
        return category[this.$i18n.locale]
      },
      getThesisTitle(thesis) {
        return thesis[this.$i18n.locale]
      },
      addThesisEmphasis(thesis, event) {
        if (event.target.checked) {
          this.emphasized.push({ thesis: thesis.id })
        } else {
          const index = this.emphasized.findIndex((item) => item.thesis === thesis.id)
          this.emphasized.splice(index, 1)
        }
      },
      submitEmphasis() {
        const emphasized = JSON.stringify(this.emphasized)
        let answers

        if (this.$browser.supports('sessionStorage')) {
          sessionStorage.setItem('euromat-emphasized', emphasized)
          answers = JSON.parse(sessionStorage.getItem('euromat-answers'))
        } else {
          this.$root.$data.backupStorage.emphasized = emphasized
          answers = JSON.parse(this.$root.$data.backupStorage.answers)
        }

        const basePath = getTranslatedUrl('results', getTranslatedUrl('theses', null, true))
        const scoreResultPath = getScoreResultString(answers, this.emphasized)

        this.$router.push({
          path: `${basePath}/${scoreResultPath}`,
          query: this.isEmbedded ? { embedded: 'iframe' } : {},
        })
      },
    },
  }
</script>

<style lang="postcss" scoped>
  h1 {
    margin-bottom: var(--base-gap);
  }

  .emphasis-content {
    margin-bottom: var(--base-gap);
    display: flex;
    justify-content: space-between;
    align-items: center;

    & button {
      flex: 0 0 auto;
      margin-left: var(--base-gap);
    }
  }

  .thesis-list {
    --input-size: 40px;
    margin-top: var(--base-gap);
    list-style: decimal;
    counter-reset: emphasis;

    & li {
      padding-bottom: var(--base-gap);
      display: flex;
      justify-content: space-between;
      position: relative;

      &::before {
        counter-increment: emphasis;
        content: counter(emphasis) '.';
        position: absolute;
        top: 50%;
        transform: translateY(-85%);
        color: var(--cornflower-blue);
        font-size: var(--font-size-large);
        font-weight: 600;
      }

      @media (max-width: 768px) {
        flex-direction: column;

        &::before {
          top: 0;
          transform: translateY(0);
        }
      }
    }

    & li:not(:last-child) {
      margin-bottom: var(--base-gap);

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 100vw;
        height: 4px;
        background: var(--white);
      }
    }
  }

  input {
    opacity: 0;
    width: var(--input-size);
    height: var(--input-size);
    margin-right: var(--base-gap);
    margin-left: calc(var(--base-gap) * 2);

    &:focus + label::before {
      background-color: var(--orange);
    }

    &:checked + label::after {
      opacity: 1;
      transform: translate(-68px, -50%);
      background-color: var(--orange);
    }

    @media (max-width: 768px) {
      margin-bottom: var(--small-gap) / 2;

      &:checked:focus + label::after {
        transform: translate(62px, -133%);
      }

      &:checked + label::after {
        transform: translate(60px, -125%);
      }
    }
  }

  label {
    cursor: pointer;
    flex: 1;
    position: relative;

    &::after,
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate(-70px, -50%);
      border-radius: 100%;
      width: var(--input-size);
      height: var(--input-size);
    }

    &::after {
      opacity: 0;
      transform: translate(-70px, -47%);
      transition: transform 150ms var(--ease-out-back), opacity 200ms var(--ease-out-back);
    }

    &::before {
      background: var(--white);
      border: 2px solid var(--prussian-blue);
    }

    & span {
      color: var(--prussian-blue);
      display: block;
      margin-bottom: calc(var(--small-gap) / 2);
    }

    @media (max-width: 768px) {
      &::after,
      &::before {
        top: 0;
        transform: translate(60px, -125%);
      }
    }
  }

  .emphasis-controls {
    margin-top: var(--base-gap);
    display: flex;
    justify-content: flex-end;
    align-items: center;

    & button {
      margin-left: var(--base-gap);
    }
  }
</style>
