<template>
  <section class="theses">
    <div class="header-progress">
      <div>
        <span class="progress-current">{{ currentThesisStep }}</span>
        <span>/{{ thesesCount }}</span>
      </div>
      <button
        :disabled="currentThesis === 0"
        class="btn-dark btn-small"
        type="button"
        @click="goBack"
      >
        {{ $t('theses.backBtn') }}
      </button>
    </div>

    <div class="theses-content">
      <header class="theses-header">
        <h2>{{ thesisCategory }}</h2>
        <h1>{{ thesisTitle }}</h1>
      </header>

      <div class="theses-controls">
        <ul class="theses-btns">
          <li v-for="option in options" :key="option.label">
            <button type="button" @click="submitAnswer(option, $event)">
              {{ option.label }} <component :is="'feather-' + option.icon" />
            </button>
          </li>
        </ul>
        <div class="controls-sub">
          <button class="btn-dark btn-small" type="button" @click="submitAnswer(optionSkip)">
            {{ optionSkip.label }} <feather-corner-up-right />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { options, theses } from '@/data'
  import { getTranslatedUrl } from '@/i18n/helper'

  export default {
    name: 'EuroMat',

    components: {
      'feather-corner-up-right': () =>
        import('vue-feather-icons/icons/CornerUpRightIcon' /* webpackChunkName: "icons" */),
      'feather-circle': () =>
        import('vue-feather-icons/icons/CircleIcon' /* webpackChunkName: "icons" */),
      'feather-thumbs-up': () =>
        import('vue-feather-icons/icons/ThumbsUpIcon' /* webpackChunkName: "icons" */),
      'feather-thumbs-down': () =>
        import('vue-feather-icons/icons/ThumbsDownIcon' /* webpackChunkName: "icons" */),
    },

    data() {
      return {
        currentThesis: 0,
        thesesCount: theses.length,
        answers: [],
      }
    },

    computed: {
      isEmbedded() {
        return this.$route.query.embedded && this.$route.query.embedded === 'iframe'
      },
      currentThesisStep() {
        return this.currentThesis + 1
      },
      thesisTitle() {
        if (this.currentThesis === this.thesesCount) {
          return
        }
        return this.getThesis(this.currentThesis).thesis[this.$i18n.locale]
      },
      thesisCategory() {
        if (this.currentThesis === this.thesesCount) {
          return
        }
        return this.getThesis(this.currentThesis).category[this.$i18n.locale]
      },
      options() {
        return options
          .map((option) =>
            Object.assign({}, option, {
              label: this.$t(`theses.${option.position}`),
              icon: this.getIconName(option.position),
            })
          )
          .filter((option) => option.position !== 'skipped')
      },
      optionSkip() {
        const skipped = options.find((option) => option.position === 'skipped')
        return Object.assign({}, skipped, {
          label: this.$t('theses.skipped'),
        })
      },
    },

    methods: {
      getIconName(type) {
        switch (type) {
          case 'positive':
            return 'thumbs-up'
          case 'neutral':
            return 'circle'
          case 'negative':
            return 'thumbs-down'
          case 'skipped':
            return 'corner-up-right'
          default:
        }
      },
      getThesis(id) {
        return theses.find((t) => t.id === id)
      },
      goBack() {
        const thesis = this.getThesis(this.currentThesis)
        const index = this.answers.findIndex((a) => a.thesis === thesis.id)
        this.answers.splice(index, 1)
        this.currentThesis -= 1
      },
      submitAnswer(option, event) {
        if (!option) {
          // eslint-disable-next-line
          return console.warn('Invalid answer')
        }

        const thesis = this.getThesis(this.currentThesis)
        this.answers.push({ thesis: thesis.id, position: option.position })
        this.currentThesis += 1
        event && event.target.blur()
        window.scrollTo(0, 0)

        if (this.currentThesis === this.thesesCount) {
          this.forwardToResults()
        }
      },
      forwardToResults() {
        const answers = JSON.stringify(this.answers)

        if (this.$browser.supports('sessionStorage')) {
          sessionStorage.setItem('euromat-answers', answers)
        } else {
          this.$root.$data.backupStorage.answers = answers
        }

        this.$router.push({
          path: getTranslatedUrl('emphasis', getTranslatedUrl('theses', null, true)),
          query: this.isEmbedded ? { embedded: 'iframe' } : {},
        })
      },
    },
  }
</script>

<style lang="postcss" scoped>
  .theses {
    display: flex;
    align-items: flex-start;

    @media (max-width: 835px) {
      flex-direction: column;
    }
  }

  .header-progress {
    flex: 1 0 100px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-right: calc(var(--base-gap) * 2);
    color: var(--text-color-secondary);

    @media (max-width: 835px) {
      flex: 1;
      width: 100%;
      flex-direction: row;
      justify-content: space-between;
      margin-right: 0;
      margin-bottom: 0;
    }

    > div {
      display: flex;
    }

    span {
      font-size: var(--font-size-large);
      font-weight: 600;
      display: inline;

      @media (max-width: 835px) {
        font-size: calc(var(--font-size-large) - 50%);
      }
    }

    .progress-current {
      color: var(--text-color-special);
    }

    button {
      margin-top: calc(var(--base-gap) + 5);

      @media (max-width: 835px) {
        margin-top: 0;
        margin-left: var(--base-gap);
      }
    }
  }

  .theses-content {
    text-align: left;
    width: 100%;
  }

  .theses-header {
    margin-bottom: calc(var(--base-gap) + 5);
    text-align: left;

    h1,
    h2 {
      overflow-wrap: break-word;
    }

    h2 {
      margin-bottom: var(--base-gap);
    }
  }

  .theses-controls {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .controls-sub {
    display: flex;
    margin-top: var(--small-gap);

    button:first-of-type {
      margin-right: var(--small-gap);
    }
  }

  .theses-btns {
    list-style: none;
    display: flex;
    justify-content: center;

    li:not(:last-child) {
      margin-right: var(--small-gap);
    }

    @media (max-width: 835px) {
      flex-direction: column;
      margin-bottom: var(--base-gap);

      li:not(:last-child) {
        margin-right: 0;
        margin-bottom: var(--small-gap);
      }
    }
  }
</style>
