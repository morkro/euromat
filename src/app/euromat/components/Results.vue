<template>
  <section>
    <header class="results-header">
      <h1>{{ $t('results.headline') }}</h1>
    </header>

    <div class="results-content">
      <p>{{ $t('results.entry') }}</p>
      <span>{{ $t('results.hint') }}</span>
    </div>

    <ul class="party-results">
      <li v-for="party of parties" :key="party.token">
        <router-link :to="{ path: getPartyPath(party.token) }">
          <div class="result-party-info">
            <div class="result-party-logo">
              <img
                v-if="hasPartyLogo(party.token)"
                :src="getPartyLogo(party.token)"
                width="50"
                height="50"
                :alt="party.token"
              />
              <span v-else>{{ party.token }}</span>
            </div>

            <h2>{{ getScorePercentage(party.score) }}%</h2>
          </div>

          <feather-zoom-in class="results-see-more" />

          <v-progress class="result-percentage" :value="party.score" :max="totalMaxPoints" />
        </router-link>
      </li>
    </ul>

    <div v-if="!isEmbedded" class="results-ctrls">
      <p>{{ $t('results.thanks') }}</p>
      <v-button router-link as="a" dark :to="{ path: startOverUrl }">
        {{ $t('results.startoverBtn') }}
        <feather-rotate-cw />
      </v-button>
    </div>
  </section>
</template>

<script>
  import { getTranslatedUrl } from '@/i18n/helper'
  import { getPartiesWithScores, getTotalMaxPoints } from '@/app/euromat/scoring'
  import { parties } from '@/data'

  export default {
    name: 'Results',

    components: {
      'feather-zoom-in': () =>
        import('vue-feather-icons/icons/ZoomInIcon' /* webpackChunkName: "icons" */),
      'feather-rotate-cw': () =>
        import('vue-feather-icons/icons/RotateCwIcon' /* webpackChunkName: "icons" */),
    },

    data() {
      return {
        scoringGrid: [],
        parties: [],
        totalMaxPoints: 0,
      }
    },

    computed: {
      startOverUrl() {
        return getTranslatedUrl('theses')
      },
      isEmbedded() {
        return this.$route.query.embedded && this.$route.query.embedded === 'iframe'
      },
    },

    async created() {
      if (this.$route.params.result) {
        const [maxScore, ...results] = this.$route.params.result.split(',')
        const [, maxScoreNumber] = maxScore.split(':') // 's:79'
        this.totalMaxPoints = parseInt(maxScoreNumber, 10)
        this.parties = results.map((p) => {
          const [id, score] = p.split(':') // 10:42 (example)
          return {
            id,
            score,
            token: parties.find((party) => party.id === Number(id))?.token,
          }
        })

        return
      }

      let emphasized
      let answers

      if (this.$browser.supports('sessionStorage')) {
        emphasized = JSON.parse(sessionStorage.getItem('euromat-emphasized'))
        answers = JSON.parse(sessionStorage.getItem('euromat-answers'))
      } else {
        emphasized = JSON.parse(this.$root.$data.backupStorage.emphasized)
        answers = JSON.parse(this.$root.$data.backupStorage.answers)
      }

      if (!emphasized) {
        this.$router.push({ path: getTranslatedUrl('theses') })
      }

      const partiesWithScores = getPartiesWithScores(answers, emphasized, parties)
      this.parties = partiesWithScores.sort((a, b) => a.score - b.score).reverse()
      this.totalMaxPoints = getTotalMaxPoints(answers, emphasized)
    },

    methods: {
      getPartyPath(token) {
        return `${getTranslatedUrl('party')}/${token.toLowerCase()}`
      },
      getPartyLogo(token) {
        try {
          return require(`@/assets/svg/${token.toLowerCase().replace(/\s/g, '-')}-logo.svg`)
        } catch {
          try {
            return require(`@/assets/${token.toLowerCase().replace(/\s/g, '-')}-logo.png`)
          } catch (error) {
            // eslint-disable-next-line no-console
            console.warn(
              `No logo found for party "${token}", falling back to initials.`,
              error.message
            )
            return false
          }
        }
      },
      hasPartyLogo(token) {
        try {
          require(`@/assets/svg/${token.toLowerCase().replace(/\s/g, '-')}-logo.svg`)
          return true
        } catch {
          try {
            require(`@/assets/${token.toLowerCase().replace(/\s/g, '-')}-logo.png`)
            return true
          } catch {
            return false
          }
        }
      },
      getScorePercentage(score) {
        return ((score / this.totalMaxPoints) * 100).toFixed(2)
      },
    },
  }
</script>

<style lang="postcss" scoped>
  section {
    width: 95%;
    margin: 0 auto;
  }

  .results-header {
    margin-bottom: var(--base-gap);

    & h1 {
      margin-bottom: var(--small-gap);
    }
  }

  .results-content {
    margin-bottom: var(--base-gap);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: stretch;
    justify-content: space-around;
    align-items: baseline;

    & p {
      font-size: var(--font-size-medium);
    }

    & span {
      margin-left: var(--small-gap);
      width: 60%;
      color: var(--prussian-blue);
      font-size: var(--font-size-small);
      background: var(--white);
      padding: calc(var(--base-gap) / 2);
      display: inline-block;
      border-radius: var(--border-radius);
      border: 1px solid var(--prussian-blue);

      &::before {
        content: '';
      }
    }
  }

  .party-results {
    list-style: none;
    width: 100%;
    counter-reset: result;

    & li {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin-bottom: var(--base-gap);
      position: relative;

      &:hover .results-see-more {
        opacity: 1;
      }

      &::before {
        counter-increment: result;
        content: counter(result) '.';
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        color: var(--prussian-blue);
        font-size: var(--font-size-xlarge);
        font-weight: 600;
      }

      @media (max-width: 650px) {
        &::before {
          display: none;
        }
      }
    }

    & a:not(.party-results-national-logo) {
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

    & h2,
    & .results-see-more {
      position: relative;
      z-index: 1;
    }

    & h2 {
      color: var(--prussian-blue);
      font-weight: 600;

      & span {
        font-weight: 400;
      }
    }

    & .results-see-more {
      stroke: var(--prussian-blue);
      height: 32px;
      width: 32px;
      opacity: 0;
      transition: opacity 150ms var(--ease-out-back);
      margin-right: var(--base-gap);
    }

    & .result-percentage {
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

    & .result-party-logo {
      margin-right: var(--small-gap);
      position: relative;
      z-index: 1;
      background: var(--background-secondary);
      border-radius: var(--border-radius);
      width: 80px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 2px;

      & img {
        object-fit: contain;
      }

      & span {
        color: var(--prussian-blue);
        font-weight: 700;
      }
    }
  }

  .results-ctrls {
    margin-top: var(--base-gap);
    display: flex;

    & p {
      margin-right: var(--small-gap);
    }
  }
</style>
