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
              >
              <span v-else>{{ party.token }}</span>
            </div>

            <h2>{{ getScorePercentage(party.score) }}%</h2>
          </div>

          <feather-zoom-in class="results-see-more" />

          <v-progress
            class="result-percentage"
            :value="party.score"
            :max="totalMaxPoints"
          />
        </router-link>

        <div v-if="party.nationalParty" class="party-results-national">
          <feather-corner-down-right />
          <span>
            {{ $t('results.nationalParty') }}
            <a
              class="party-results-national-logo"
              :href="party.nationalParty.program"
              target="_blank"
              rel="noopener"
            >
              <div v-if="hasPartyLogo(party.nationalParty.token)">
                <img
                  :src="getPartyLogo(party.nationalParty.token)"
                  :alt="party.nationalParty.name"
                  :title="party.nationalParty.name"
                  width="40"
                  height="40"
                >
              </div>
              <span v-else>{{ party.nationalParty.token }}</span>
            </a>
          </span>
        </div>
      </li>
    </ul>

    <div v-if="!isEmbedded" class="results-ctrls">
      <p>{{ $t('results.thanks') }}</p>
      <router-link tag="a"
                   class="btn"
                   :to="{ path: `/${$i18n.locale}/` }"
      >
        {{ $t('results.indexBtn') }}
      </router-link>
      <router-link
        tag="a"
        class="btn btn-dark btn-small"
        :to="{ path: startOverUrl }"
      >
        {{ $t('results.startoverBtn') }}
        <feather-rotate-cw />
      </router-link>
    </div>

    <div class="results-affiliation">
      <a
        href="https://www.talkingeurope.com/"
        target="_blank"
        rel="noopener"
      >
        <img
          :src="talkingEuropeBanner"
          title="Talking Europe"
          alt="Talking Europe Banner"
        >
      </a>
    </div>
  </section>
</template>

<script>
  import { IPDATA_URL } from '@/config/api'
  import { getTranslatedUrl, getUserLanguage } from '@/i18n/helper'
  import { getPartiesWithScores, getTotalMaxPoints } from '@/app/euromat/scoring'
  import { parties } from '@/data'

  export default {
    name: 'Results',

    components: {
      'feather-zoom-in': () =>
        import('vue-feather-icons/icons/ZoomInIcon' /* webpackChunkName: "icons" */),
      'feather-rotate-cw': () =>
        import('vue-feather-icons/icons/RotateCwIcon' /* webpackChunkName: "icons" */),
      'feather-corner-down-right': () =>
        import('vue-feather-icons/icons/CornerDownRightIcon' /* webpackChunkName: "icons" */)
    },

    data () {
      return {
        userCountry: getUserLanguage().country,
        scoringGrid: [],
        parties: [],
        totalMaxPoints: 0
      }
    },

    computed: {
      startOverUrl () {
        return getTranslatedUrl('theses')
      },
      isEmbedded () {
        return (
          this.$route.query.embedded &&
          this.$route.query.embedded === 'iframe'
        )
      },
      talkingEuropeBanner () {
        try {
          return require(`@/assets/talkingeurope/talkingeurope-${this.$i18n.locale}.png`)
        } catch (e) {
          console.warn('TalkingEurope image not found, defaulting to "en". ', e)
          return require(`@/assets/talkingeurope/talkingeurope-en.png`)
        }
      }
    },

    async created () {
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

      try {
        const ipResponse = await fetch(IPDATA_URL)
        const ipData = await ipResponse.json()
        if (ipData.country_code) {
          this.userCountry = ipData.country_code.toLowerCase()
        }
      } catch (error) {
        console.warn('Unable to fetch geo location:', error)
      }

      const partiesWithScores = getPartiesWithScores(answers, emphasized, parties)
      this.parties = partiesWithScores.map(party => ({
        token: party.token,
        score: party.score,
        nationalParty: party['national_parties'][this.userCountry]
      }))
        .sort((a, b) => a.score - b.score)
        .reverse()
      this.totalMaxPoints = getTotalMaxPoints(answers, emphasized)
    },

    methods: {
      getPartyPath (token) {
        return `${getTranslatedUrl('party')}/${token.toLowerCase()}`
      },
      getPartyLogo (token) {
        try {
          return require(`@/assets/svg/${token.toLowerCase().replace(/\s/g, '-')}-logo.svg`)
        } catch (e) {
          try {
            return require(`@/assets/${token.toLowerCase().replace(/\s/g, '-')}-logo.png`)
          } catch (error) {
            console.warn(`No logo found for party "${token}", falling back to initials.`, error.message)
            return false
          }
        }
      },
      hasPartyLogo (token) {
        try {
          require(`@/assets/svg/${token.toLowerCase().replace(/\s/g, '-')}-logo.svg`)
          return true
        } catch (e) {
          try {
            require(`@/assets/${token.toLowerCase().replace(/\s/g, '-')}-logo.png`)
            return true
          } catch (error) {
            return false
          }
        }
      },
      getScorePercentage (score) {
        return (score / this.totalMaxPoints * 100).toFixed(2)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/animations";
  @import "~@/styles/colors";
  @import "~@/styles/layout";

  $result-bar-length: 92%;

  section {
    width: 95%;
    margin: 0 auto;
  }

  .results-header {
    margin-bottom: $base-gap;

    h1 {
      margin-bottom: $small-gap;
    }
  }

  .results-content {
    margin-bottom: $base-gap;

    span {
      margin-top: $small-gap;
      color: $text-color-secondary;
      font-size: $font-size-small;
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

    a:not(.party-results-national-logo) {
      height: 80px;
      width: $result-bar-length;
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

  .party-results-national {
    width: $result-bar-length;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-top: calc(#{$small-gap} / 2);
    padding-left: $small-gap;

    svg {
      margin-right: calc(#{$small-gap} / 2);
    }

    > span {
      display: inline-flex;
      align-items: center;
    }

    .party-results-national-logo {
      display: inline-block;
      font-weight: 700;
      margin-left: calc(#{$small-gap} / 2);

      > div {
        width: 70px;
        height: auto;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
      }

      img {
        object-fit: contain;
        width: 80%;
      }
    }

    @media (max-width: 650px) {
      width: 100%;
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

      span {
        color: $text-color-invert;
        font-weight: 700;
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

  .results-affiliation {
    background: $medium-blue;
    width: 100%;
    margin-top: $base-gap * 2;
    padding: calc(#{$small-gap} / 2);
    border-radius: calc(#{$border-radius} / 3);

    @media (max-width: 650px) {
      padding: 0;
      margin-top: $base-gap * 2;
      border-top: 4px solid $transparent-white;
      padding-top: $small-gap;
      border-radius: 0;
      background: transparent;
    }

    a {
      display: block;
    }

    img {
      width: 100%;
      height: auto;
      vertical-align: middle;
    }
  }
</style>
