<template>
  <section>
    <header class="results-header">
      <h1>{{ $t('euromat.results.headline') }}</h1>
      <p>{{ $t('euromat.results.entry') }}</p>
    </header>

    <ul class="party-results">
      <li v-for="party of parties">
        <router-link :to="{ path: getPartyPath(party.token.toLowerCase()) }">
          <div class="result-party-info">
            <div class="result-party-logo">
              <img :src="getPartyLogo(party.token)" width="50" height="50" :alt="party.token" />
            </div>

            <h2>{{ getScorePercentage(party.score) }}%</h2>
          </div>

          <feather-zoom-in class="results-see-more" />
          <party-percentage
            class="result-percentage"
            :value="getScorePercentage(party.score)"
            :max="totalScoredPoints" />
        </router-link>
      </li>
    </ul>

    <div class="results-ctrls">
      <p>{{ $t('euromat.results.thanks') }}</p>
      <router-link tag="a" class="btn" :to="{ path: '/' }">
        {{ $t('euromat.results.buttons.index') }}
      </router-link>
      <router-link
        tag="a"
        class="btn btn-dark btn-small"
        :to="{ path: this.isGermanLocale ? '/thesen' : '/theses' }">
        {{ $t('euromat.results.buttons.startover') }}
        <feather-rotate-cw />
      </router-link>
    </div>
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
      getPartyLogo (token) {
        return require(`@/assets/svg/${token.toLowerCase()}-logo.svg`)
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

      if (!emphasized) {
        this.$router.push({ path: this.isGermanLocale ? '/thesen' : '/theses' })
      }

      this.emphasized = emphasized
      this.answers = answers

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
  @import "~styles/animations";
  @import "~styles/colors";
  @import "~styles/layout";

  section {
    width: 95%;
    margin: 0 auto;
  }

  .results-header {
    margin-bottom: $base-gap * 2;

    h1 {
      margin-bottom: $small-gap;
    }
  }

  .party-results {
    list-style: none;
    width: 100%;
    counter-reset: result;

    li {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin-bottom: $base-gap;
      position: relative;

      &:hover .results-see-more {
        opacity: 1;
      }

      &::before {
        counter-increment: result;
        content: counter(result) ".";
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        color: $text-color-secondary;
        font-size: $font-size-xlarge;
        font-weight: 600;
      }

      @media (max-width: 650px) {
        &::before {
          display: none;
        }
      }
    }

    a {
      height: 80px;
      width: 92%;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;

      @media (max-width: 650px) {
        width: 100%;
      }
    }

    h2,
    .results-see-more {
      position: relative;
      z-index: 1;
    }

    h2 {
      color: $text-color-base;
      font-weight: 600;
      text-shadow: $text-shadow;

      span {
        font-weight: 400;
      }
    }

    .results-see-more {
      stroke: $text-color-base;
      filter: drop-shadow($text-shadow);
      height: 32px;
      width: 32px;
      opacity: 0;
      transition: opacity 150ms $easeOutBack;
      margin-right: $base-gap;
    }

    .result-percentage {
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .result-party-info {
    display: flex;
    height: calc(100% - 4px);
    align-items: center;
    justify-content: center;

    .result-party-logo {
      margin-right: $small-gap;
      position: relative;
      z-index: 1;
      background: $background-secondary;
      border-radius: $border-radius;
      width: 80px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 2px;

      img {
        object-fit: contain;
      }
    }
  }

  .results-ctrls {
    margin-top: $base-gap * 2;
    border-top: 4px solid $transparent-white;
    padding-top: $small-gap;

    p {
      margin-bottom: $small-gap;
    }

    a:first-of-type {
      margin-right: $small-gap;
    }
  }
</style>
