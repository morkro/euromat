<template>
  <section>
    <header class="results-header">
      <h1>{{ $t('euromat.results.headline') }}</h1>
    </header>

    <ul class="party-results">
      <li v-for="party in parties">
        <h2>{{ party.token }}</h2>
        <svgicon :name="getPartyLogoName(party.token)" width="50" height="50" />
        <party-percentage :value="getPartyMatch(party)" :max="thesesCount" />
      </li>
    </ul>
  </section>
</template>

<script>
  import { getParties, getParty, getThesesCount } from '@/utils/data'
  import Progress from '@/components/progress'
  import '@/assets/icons'

  export default {
    name: 'Results',

    components: {
      'party-percentage': Progress
    },

    data () {
      return {
        results: [],
        thesesCount: getThesesCount(),
        parties: getParties()
      }
    },

    methods: {
      getPartyMatch (party) {
        const { positions } = getParty(party.token)
        return this.results
          .filter(answer =>
            answer.option.position === positions[answer.thesis.id].position)
          .length
      },
      getPartyLogoName (token) {
        return `${token.toLowerCase()}-logo`
      }
    },

    mounted () {
      this.results = JSON.parse(localStorage.getItem('euromat-results'))
      console.log(this.results)
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
