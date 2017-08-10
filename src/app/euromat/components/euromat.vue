<template>
  <section class="euromat">
    <header>
      <span>{{ currentThesis + 1 }}/{{ thesesCount }}</span>
      <progress :value="currentThesis + 1" :max="thesesCount">
        {{ currentThesis }}
      </progress>
      <h1 class="thesis">{{ thesisTitle }}</h1>
    </header>

    <div class="euromat-controls">
      <button type="button" @click="submitAnswer(optionSkip)">
        {{ optionSkip.label }}
      </button>
      <ul class="euromat-btns">
        <li v-for="option in options" v-if="option.position !== 'skipped'">
          <button type="button" @click="submitAnswer(option)">
            {{ option.label }}
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  import { getAllOptions, getThesis, getThesesCount } from '@/utils/data'

  export default {
    name: 'EuroMat',

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
      submitAnswer (option) {
        if (!option) {
          return console.warn('Invalid answer')
        }
        if (this.currentThesis === this.thesesCount - 1) {
          this.forwardToResults()
        }

        const thesis = getThesis(this.currentThesis)
        this.answers.push({ thesis, option })
        this.currentThesis += 1
      },
      forwardToResults () {
        localStorage.setItem('results', JSON.stringify(this.answers, null, 2))
        this.$router.push({ path: 'ergebnisse' })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .euromat-btns {
    list-style: none;
    display: flex;
  }
</style>
