<template>
  <section>
    <header class="results-header">
      <h1>{{ $t('euromat.results.headline') }}</h1>
    </header>

    <ul class="party-results">
      <li v-for="party of parties">
        <router-link :to="{ path: getPartyPath(party.token.toLowerCase()) }">
          <h2>{{ party.token }} ({{ getScorePercentage(party.score) }} %)</h2>
          <!-- <svgicon :name="getPartyLogoName(item.token)" width="50" height="50" /> -->
          <party-percentage
            class="result-percentage"
            :value="getScorePercentage(party.score)"
            :max="totalScoredPoints" />
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script>
  import {
    MAX_POINTS,
    BASE_POINTS,
    MIN_POINTS,
    EMPHASIS_POINTS,
    getScoringGrid
  } from '@/app/euromat/scoring'
  import { parties } from '@/data'
  import Progress from '@/components/progress'
  import '@/assets/icons'

  // FIXME: There is a bug that not all theses are send to localStorage.
  // We have 43 theses now, but only 42 are stored. Hence I check if
  // answers is even an object.

  const addUp = (a, b) => a + b

  export default {
    name: 'Results',

    components: {
      'party-percentage': Progress
    },

    data () {
      return {
        scoringGrid: [],
        answers: [],
        emphasized: [],
        scores: [],
        parties,
        totalScoredPoints: 0
      }
    },

    computed: {
      isGermanLocale () {
        return this.$i18n.locale === 'de'
      }
    },

    methods: {
      getPartyPath (token) {
        return this.isGermanLocale
          ? `/partei/${token}`
          : `/party/${token}`
      },
      getPartyLogoName (token) {
        return `${token.toLowerCase()}-logo`
      },
      getScorePercentage (score) {
        return (score / this.totalScoredPoints * 100).toFixed(2)
      },
      evalPoints (party, user, emphasis) {
        let score = 0

        if (user.position === party.position) {
          score = MAX_POINTS
        } else if (
          (user.position === 'positive' && party.position === 'neutral') ||
          (user.position === 'neutral' && party.position === 'positive') ||
          (user.position === 'negative' && party.position === 'neutral')
        ) {
          score = BASE_POINTS
        } else if (
          (user.position === 'positive' && party.position === 'negative') ||
          (user.position === 'neutral' && party.position === 'negative') ||
          (user.position === 'negative' && party.position === 'positive')
        ) {
          score = MIN_POINTS
        }

        return {
          party: party.party,
          score: emphasis ? score * EMPHASIS_POINTS : score
        }
      },
      getHighestScore (scores) {
        const highestScore = Math.max(...scores.map(s => s.score))

        if (!highestScore) {
          return MIN_POINTS
        }

        return highestScore === 1
          ? MAX_POINTS
          : highestScore
      },
      getScorePoints (grid) {
        // 1. Iterate over scoringGrid
        // 2. Get user and party positions of each thesis
        // 3. Evaluate points based on calculation model for each party
        // 4. Count the highest score per thesis
        // 5. Return a new object for each thesis row with results
        return grid.map(row => {
          const partiesFromRow = row.positions.filter(p => p.type === 'party')
          const user = row.positions[row.positions.length - 1]
          const scores = partiesFromRow.map(party => this.evalPoints(party, user, row.emphasis))
          const highestScore = this.getHighestScore(scores)
          return { thesis: row.thesis, highestScore, scores }
        })
      },
      getScorePerParty (party) {
        return {
          token: party.token,
          score: this.scores
            .map(t => t.scores.find(s => s.party === party.id).score)
            .reduce(addUp, 0)
        }
      }
    },

    created () {
      const emphasized = JSON.parse(sessionStorage.getItem('euromat-emphasized'))
      const answers = JSON.parse(sessionStorage.getItem('euromat-answers'))

      if (emphasized) this.emphasized = emphasized
      if (answers) this.answers = answers

      this.scoringGrid = getScoringGrid(this.answers, this.emphasized)
      this.scores = this.getScorePoints(this.scoringGrid)
      this.parties = this.parties
        .map(this.getScorePerParty)
        .sort((a, b) => a.score - b.score)
        .reverse()
      this.totalScoredPoints = this.scores
        .map(s => s.highestScore)
        .reduce(addUp, 0)
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

    .result-percentage {
      height: 40px;
    }
  }
</style>
