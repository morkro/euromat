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
  import { getAllOptions, getThesis, getThesesCount } from '@/utils/data'
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
        options: getAllOptions(),
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
        this.answers.push({ thesis, option })
        this.currentThesis += 1
        event.target.blur()
      },
      forwardToResults () {
        localStorage.setItem('euromat-results', JSON.stringify(this.answers, null, 2))
        this.$router.push({ path: 'ergebnisse' })
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
    margin-top: $base-gap / 2;
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
