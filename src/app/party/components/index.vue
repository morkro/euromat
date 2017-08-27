<template>
  <section>
    <header class="party-header">
      <div class="party-header-logo">
        <img :src="partyLogo" :width="logoSize" :height="logoSize" :alt="partyName" />
      </div>

      <div class="party-header-info">
        <router-link v-if="!!answers" class="btn btn-dark btn-small" :to="{ path: resultsPath }">
          {{ $t('party.back') }}
          <feather-corner-up-left />
        </router-link>
        <h1>{{ partyName }}</h1>
      </div>
    </header>

    <div class="theses-legend">
      <p>{{ $t('party.legend') }}:</p>
      <ul>
        <li v-for="option in options">
          <feather-icon :type="positionToIconName(option.position)" />
          <span>{{ $t(`euromat.options.${option.position}`) }}</span>
        </li>
      </ul>
    </div>

    <ul class="party-theses-list">
      <li class="list-header">
        <h2>{{ $t('party.table.thesis') }}</h2>
        <h2>{{ party.token }}</h2>
        <h2 v-if="!!answers">{{ $t('party.table.user') }}</h2>
      </li>
      <li v-for="thesis in theses">
        <div class="list-thesis">
          <span>{{ getCategory(thesis.category) }}</span>
          <h3>{{ getThesis(thesis.thesis) }}</h3>
        </div>

        <div class="statements-party">
          <feather-icon :type="getPartyStatement(thesis.id)" />
        </div>
        <div v-if="!!answers" class="statements-user">
          <feather-icon :type="getUserStatement(thesis.id)" />
        </div>
      </li>
    </ul>

    <router-link v-if="!!answers" class="btn btn-dark btn-small" :to="{ path: resultsPath }">
      {{ $t('party.back') }}
      <feather-corner-up-left />
    </router-link>
  </section>
</template>

<script>
  import { parties, theses, options } from '@/data'
  export default {
    name: 'Party',

    data () {
      return {
        logoSize: 60,
        partyLogo: require(`@/assets/svg/${this.$route.params.token}-logo.svg`),
        party: parties.find(p => p.token === this.$route.params.token.toUpperCase()),
        answers: JSON.parse(sessionStorage.getItem('euromat-answers')),
        theses,
        options
      }
    },

    computed: {
      isGermanLocale () {
        return this.$i18n.locale === 'de'
      },
      resultsPath () {
        return this.isGermanLocale
          ? '/thesen/ergebnis'
          : '/theses/results'
      },
      partyName () {
        return this.party.name[this.$i18n.locale]
      }
    },

    methods: {
      getCategory (category) {
        return category[this.$i18n.locale]
      },
      getThesis (thesis) {
        return thesis[this.$i18n.locale]
      },
      positionToIconName (position) {
        switch (position) {
          case 'positive':
            return 'thumbs-up'
          case 'negative':
            return 'thumbs-down'
          case 'skipped':
            return 'x'
          case 'neutral':
          default:
            return 'circle'
        }
      },
      getPartyStatement (id) {
        return this.positionToIconName(
          this.party.positions.find(p => p.thesis === id).position
        )
      },
      getUserStatement (id) {
        return this.positionToIconName(
          this.answers.find(a => a.thesis === id).position
        )
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/colors";
  @import "~styles/layout";

  $table-column-large: 70%;
  $table-column-small: 15%;

  .party-header {
    display: flex;
    align-items: flex-start;
    margin-bottom: $base-gap;

    .party-header-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-right: $small-gap;

      .btn {
        margin-bottom: $small-gap / 2;
      }
    }

    .party-header-logo {
      margin-right: $small-gap;
      background: $background-secondary;
      padding: $small-gap;
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: $button-shadow;

      img {
        object-fit: contain;
      }
    }
  }

  .theses-legend {
    display: flex;
    flex-direction: column;
    font-size: $font-size-tiny;

    p {
      font-weight: 600;
      margin-bottom: $small-gap / 2;
    }

    ul {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
    }

    li {
      display: flex;
      align-items: center;
      background: rgba(0, 0, 0, 0.1);
      border-radius: $border-radius;
      padding: $small-gap / 3 $small-gap / 1.5;
      margin-bottom: $small-gap / 3;

      &:not(:last-child) {
        margin-right: $small-gap / 3;
      }
    }

    svg {
      width: 12px;
      height: 12px;
      margin-right: $small-gap / 3;
    }
  }

  .party-theses-list {
    margin: $small-gap / 2 0 $base-gap 0;
    list-style: none;
    border-bottom: 4px solid $transparent-white;

    .list-header {
      display: flex;
      justify-content: space-between;
      background: $transparent-white;
      border-radius: $border-radius;
      padding: $small-gap;

      h2 {
        flex: 1 0 $table-column-small;
        font-size: $font-size-base;
        color: $text-color-base;
        margin: 0;
        text-align: center;
      }

      h2:first-of-type {
        flex: 1 0 $table-column-large;
        width: $table-column-large;
        text-align: left;
      }
    }

    li {
      padding: $small-gap;
      display: flex;
      align-items: stretch;
    }

    li:not(:last-child):not(.list-header) {
      border-bottom: 2px dashed $transparent-white;
    }

    .list-thesis {
      flex: 1 0 $table-column-large;
      padding-right: $small-gap;

      span {
        color: $text-color-secondary;
        margin-bottom: $small-gap / 2;
        display: inline-block;
      }
    }

    .statements-party,
    .statements-user {
      flex: 1 0 $table-column-small;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .statements-party {
      background: rgba(255, 255, 255, 0.1);
      border-radius: $border-radius;
    }
  }
</style>
