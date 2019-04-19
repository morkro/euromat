<template>
  <section>
    <h1>{{ $t('about.headline') }}</h1>

    <div class="about-content">
      <div class="about-text">
        <v-markdown :source="$t('about.content')" />
      </div>

      <div class="about-people">
        <div class="people-group polis">
          <div class="group-inner">
            <h2>
              <a :href="teamLabel.polis.url" target="_blank">
                <img
                  class="team-logo polis"
                  :src="polisLogo"
                  :alt="teamLabel.polis.label"
                  width="150"
                  height="100"
                >
                <span hidden>{{ teamLabel.polis.label }}</span>
              </a>
            </h2>
            <ul>
              <li v-for="(member, index) of members.polis" :key="'member-polis-' + index">
                <a
                  v-if="member.profile"
                  :href="member.profile"
                  target="_blank"
                >
                  {{ member.name }}
                  <feather-external-link />
                </a>
                <span v-else>{{ member.name }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="people-group poe">
          <div class="group-inner">
            <h2>
              <a :href="teamLabel.poe.url" target="_blank">
                <img
                  class="team-logo poe"
                  :alt="teamLabel.poe.label"
                  :src="poeLogo"
                  width="400"
                  height="60"
                >
                <span hidden>{{ teamLabel.poe.label }}</span>
              </a>
            </h2>
            <ul>
              <li v-for="(member, index) of members.poe" :key="'member-poe-' + index">
                <a
                  v-if="member.profile"
                  :href="member.profile"
                  target="_blank"
                >
                  {{ member.name }}
                  <feather-external-link />
                </a>
                <span v-else>{{ member.name }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="people-group dev">
          <div class="group-inner dark">
            <h2>{{ $t('about.devDesign') }}</h2>
            <ul>
              <li v-for="(member, index) of members.dev" :key="'member-dev-' + index">
                <a
                  v-if="member.profile"
                  :href="member.profile"
                  target="_blank"
                >
                  {{ member.name }}
                  <feather-external-link />
                </a>
                <span v-else>{{ member.name }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import '@/assets/icons'
  export default {
    name: 'About',

    components: {
      'feather-external-link': () =>
        import('vue-feather-icons/icons/ExternalLinkIcon' /* webpackChunkName: "icons" */)
    },

    data () {
      return {
        polisLogo: require('@/assets/svg/polis-colored-logo.svg'),
        poeLogo: require('@/assets/svg/poe-colored-logo.svg'),
        members: {
          polis: [
            { name: 'Susanne Zels', profile: 'https://www.linkedin.com/in/susannezels/' },
            { name: 'Stephan Kreutzer', profile: 'https://www.linkedin.com/in/stephan-kreutzer-905a0635/' },
            { name: 'Benjamin Lenzing', profile: null },
            { name: 'Johannes John', profile: null }
          ],
          poe: [
            { name: 'Eva Podgoršek', profile: 'https://twitter.com/evapodg' },
            { name: 'Peter Funk', profile: 'https://twitter.com/funk67' }
          ],
          dev: [
            { name: 'Moritz Kröger', profile: 'http://moritz.berlin' }
          ]
        },
        teamLabel: {
          polis: {
            label: 'Polis180',
            url: 'https://polis180.org/'
          },
          poe: {
            label: 'Pulse of Europe',
            url: 'https://pulseofeurope.eu'
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/colors";
  @import "~@/styles/layout";

  $breakpoint: 630px;

  h1,
  p {
    margin-bottom: $base-gap;
  }

  .team-logo.poe {
    width: 100%;
    height: auto;
  }

  .about-content {
    display: flex;
    flex-direction: column;
  }

  .about-text {
    margin-bottom: $base-gap;
  }

  .about-people {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;

    @media (max-width: $breakpoint) {
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }

    .people-group {
      flex: 0 0 50%;
      text-align: center;

      @media (max-width: $breakpoint) {
        flex: 0 0 100%;
        width: 100%;
      }
    }

    h2 {
      margin-bottom: $small-gap;
      color: $text-color-secondary;
    }

    ul {
      list-style: none;
    }

    li:not(:last-child) {
      margin-bottom: $small-gap;
    }

    svg:not(.team-logo) {
      stroke: $transparent-white;
      width: 1em;
      height: 1em;
    }
  }

  .group-inner {
    width: calc(100% - #{$base-gap});
    background: $background-secondary;
    border-radius: $border-radius / 2;
    box-shadow: $button-shadow;
    padding: $base-gap;
    color: $text-color-secondary;
    margin-bottom: $base-gap;

    @media (max-width: $breakpoint) {
      width: 100%;
    }

    &.dark {
      background: $dark-blue;

      h2,
      a,
      span {
        color: $text-color-base;
      }
    }

    a,
    span {
      color: $text-color-secondary;
      font-weight: 700;
    }

    a:hover {
      color: $text-color-special;
    }

    svg:not(.team-logo) {
      stroke: $blue !important;
    }
  }
</style>
