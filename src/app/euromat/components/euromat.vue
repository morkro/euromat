<template>
  <section class="euromat">
    <div class="header-progress">
      <span>{{ currentThesis + 1 }}/{{ thesesCount }}</span>
      <thesis-progress :value="currentThesis + 1" :max="thesesCount" />
    </div>

    <header class="euromat-header">
      <h1 class="thesis">{{ thesisTitle }}</h1>
    </header>

    <div class="euromat-controls">
      <ul class="euromat-btns">
        <li v-for="option in options" v-if="option.position !== 'skipped'">
          <button type="button" @click="submitAnswer(option, $event)">
            {{ option.label }}
          </button>
        </li>
      </ul>
      <button class="controls-skip btn-txt" type="button" @click="submitAnswer(optionSkip)">
        {{ optionSkip.label }}
      </button>
    </div>
  </section>
</template>

<script>
  import { getAllOptions, getThesis, getThesesCount } from '@/data'
  import Progress from '@/components/progress'

  export default {
    name: 'EuroMat',

    components: {
      'thesis-progress': Progress
    },

    data () {
      return {
        currentThesis: 0,
        thesesCount: getThesesCount(),
        answers: []
      }
    },

    computed: {
      thesisTitle () {
        if (this.currentThesis === this.thesesCount) {
          return
        }
        return getThesis(this.currentThesis).thesis
      },
      options () {
        return getAllOptions().map(option =>
          Object.assign({}, option, {
            label: this.$t(`euromat.options.${option.position}`)
          }))
      },
      optionSkip () {
        return this.options[this.options.length - 1]
      }
    },

    methods: {
      submitAnswer (option, event) {
        if (!option) {
          return console.warn('Invalid answer')
        }
        if (this.currentThesis === this.thesesCount - 1) {
          this.forwardToResults()
        }

        const thesis = getThesis(this.currentThesis)
        this.answers.push({ thesis: thesis.id, position: option.position })
        this.currentThesis += 1
        event && event.target.blur()
      },
      forwardToResults () {
        localStorage.setItem('euromat-answers', JSON.stringify(this.answers))
        this.$router.push({ path: '/thesen/gewichtung' })
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
      margin-right: 15px;
    }
  }

  .euromat-header {
    margin-bottom: $base-gap * 2;
  }

  .euromat-controls {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .controls-skip {
    font-style: italic;
    margin-top: $base-gap;
  }

  .euromat-btns {
    list-style: none;
    display: flex;
    justify-content: center;

    li:not(:last-child) {
      margin-right: 15px;
    }
  }
</style>
