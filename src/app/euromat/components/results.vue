<template>
  <section>
    <header class="results-header">
      <h1>{{ $t('euromat.results.headline') }}</h1>
    </header>

    <ul class="party-results">
      <li v-for="item of results">
        <h2>{{ item.token }} ({{ getScorePercentage(item.score) }} %)</h2>
        <!-- <svgicon :name="getPartyLogoName(item.token)" width="50" height="50" /> -->
        <party-percentage
          :value="getScorePercentage(item.score)"
          :max="totalScoredPoints" />
      </li>
    </ul>
  </section>
</template>

<script>
  import * as SCORING from '@/app/euromat/scoring'
  import { getParties, getThesesCount } from '@/data'
  import Progress from '@/components/progress'
  import '@/assets/icons'

  // FIXME: There is a bug that not all theses are send to localStorage.
  // We have 43 theses now, but only 42 are stored. Hence I check if
  // answers is even an object.

  export default {
    name: 'Results',

    components: {
      'party-percentage': Progress
    },

    data () {
      return {
        answers: [],
        emphasized: [],
        results: [],
        thesesCount: getThesesCount(),
        parties: getParties(),
        totalScoredPoints: 0
      }
    },

    methods: {
      getPartyLogoName (token) {
        return `${token.toLowerCase()}-logo`
      },
      getScorePercentage (score) {
        console.log(score, this.totalScoredPoints)
        return (score / this.totalScoredPoints * 100).toFixed(2)
      },
      sortResults () {
        return this.parties
          .map(party => ({
            token: party.token,
            score: party.positions
              .map(this.countScoring)
              .reduce((a, b) => a + b, 0)
          }))
          .sort((a, b) => a.score - b.score)
          .reverse()
      },
      countScoring (partyConfig) {
        const answer = this.answers.find(answer => answer.thesis === partyConfig.thesis)
        if (!answer || answer.position === 'skipped') {
          return SCORING.MIN_POINTS
        }

        let score = 0
        const hasEmphasis = !!this.emphasized.find(e => e.id === answer.thesis)
        const user = answer.position
        const party = partyConfig.position

        if (user === party) {
          score = SCORING.MAX_POINTS
        } else if (
          (user === 'positive' && party === 'neutral') ||
          (user === 'neutral' && party === 'positive') ||
          (user === 'negative' && party === 'neutral')
        ) {
          score = SCORING.BASE_POINTS
        } else if (
          (user === 'positive' && party === 'negative') ||
          (user === 'neutral' && party === 'negative') ||
          (user === 'negative' && party === 'positive')
        ) {
          score = SCORING.MIN_POINTS
        }

        score = hasEmphasis ? score * SCORING.EMPHASIS_POINTS : score
        this.totalScoredPoints += score

        return score
      }
    },

    created () {
      const emphasized = JSON.parse(localStorage.getItem('euromat-emphasized'))
      const answers = JSON.parse(localStorage.getItem('euromat-answers'))

      if (emphasized) this.emphasized = emphasized
      if (answers) this.answers = answers

      this.results = this.sortResults()
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/layout";

  .results-header {
    margin-bottom: $base-gap;
  }

  .party-results {
    list-style: none;
    width: 100%;

    li {
      display: flex;
      flex-direction: column;
      margin-bottom: $base-gap;
    }
  }
</style>
