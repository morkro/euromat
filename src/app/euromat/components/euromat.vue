<template>
  <section class="euromat">
    <div class="header-progress">
      <span>{{ currentThesis + 1 }}/{{ thesesCount }}</span>
      <thesis-progress :value="currentThesis + 1" :max="thesesCount" />
    </div>

    <header class="euromat-header">
      <h1>{{ thesisTitle }}</h1>
    </header>

    <div class="euromat-controls">
      <ul class="euromat-btns">
        <li v-for="option in options" v-if="option.position !== 'skipped'">
          <button type="button" @click="submitAnswer(option, $event)">
            {{ option.label }}
          </button>
        </li>
      </ul>
      <div class="controls-sub">
        <button
          :disabled="this.currentThesis === 0"
          class="btn-dark btn-small"
          type="button"
          @click="goBack">
          {{ $t('euromat.euromat.back') }}
        </button>
        <button
          class="btn-dark btn-small"
          type="button"
          @click="submitAnswer(optionSkip)">
          {{ optionSkip.label }}
        </button>
      </div>
    </div>
  </section>
</template>

<script>
  import { options, theses } from '@/data'
  import Progress from '@/components/progress'

  export default {
    name: 'EuroMat',

    components: {
      'thesis-progress': Progress
    },

    data () {
      return {
        currentThesis: 0,
        thesesCount: theses.length,
        answers: []
      }
    },

    computed: {
      isGermanLocale () {
        return this.$i18n.locale === 'de'
      },
      thesisTitle () {
        if (this.currentThesis === this.thesesCount) {
          return
        }
        return this.getThesis(this.currentThesis).thesis[this.$i18n.locale]
      },
      options () {
        return options.map(option =>
          Object.assign({}, option, {
            label: this.$t(`euromat.options.${option.position}`)
          }))
      },
      optionSkip () {
        return this.options[this.options.length - 1]
      }
    },

    methods: {
      getThesis (id) {
        return theses.find(t => t.id === id)
      },
      goBack () {
        const thesis = this.getThesis(this.currentThesis)
        const index = this.answers.findIndex(a => a.thesis === thesis.id)

        this.answers.splice(index, 1)
        this.currentThesis -= 1
      },
      submitAnswer (option, event) {
        if (!option) {
          return console.warn('Invalid answer')
        }
        if (this.currentThesis === this.thesesCount - 1) {
          this.forwardToResults()
        }

        const thesis = this.getThesis(this.currentThesis)
        this.answers.push({ thesis: thesis.id, position: option.position })
        this.currentThesis += 1
        event && event.target.blur()
      },
      forwardToResults () {
        sessionStorage.setItem('euromat-answers', JSON.stringify(this.answers))
        this.$router.push({ path: this.isGermanLocale
          ? '/thesen/gewichtung'
          : '/theses/emphasis'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/colors";
  @import "~styles/layout";

  .header-progress {
    display: flex;
    align-items: center;
    margin-bottom: $base-gap * 2;

    span {
      margin-right: $small-gap;
    }
  }

  .euromat-header {
    margin-bottom: $base-gap * 2;
    text-align: center;
  }

  .euromat-controls {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .controls-sub {
    display: flex;
    margin-top: $small-gap;

    button:first-of-type {
      margin-right: $small-gap;
    }
  }

  .euromat-btns {
    list-style: none;
    display: flex;
    justify-content: center;

    li:not(:last-child) {
      margin-right: $small-gap;
    }
  }
</style>
