<template>
  <section>
    <router-link :to="{ path: '/' }">
      Zurück
    </router-link>

    <ul class="party-results">
      <li v-for="party in parties">
        <span>{{ party.token }}</span>
        <progress :value="getPartyMatch(party)" :max="thesesCount">
          {{ getPartyMatch(party) }}
        </progress>
      </li>
    </ul>
  </section>
</template>

<script>
  import { getParties, getParty, getThesesCount } from '@/utils/data'

  export default {
    name: 'Results',

    data () {
      return {
        results: {},
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
      }
    },

    mounted () {
      this.results = JSON.parse(localStorage.getItem('results'))
      console.log(this.results)
    }
  }
</script>

<style lang="scss" scoped>
  .party-results {
    list-style: none;
    width: 100%;

    li {
      display: flex;
    }

    progress {
      width: 100%;
    }
  }
</style>
