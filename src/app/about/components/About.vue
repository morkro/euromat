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
                />
                <span hidden>{{ teamLabel.polis.label }}</span>
              </a>
            </h2>
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
                />
                <span hidden>{{ teamLabel.poe.label }}</span>
              </a>
            </h2>
          </div>
        </div>

        <div class="people-group dev">
          <div class="group-inner dark">
            <h2>{{ $t('about.devDesign') }}</h2>
            <ul>
              <li v-for="(member, index) of members.dev" :key="'member-dev-' + index">
                <a v-if="member.profile" :href="member.profile" target="_blank">
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
        import('vue-feather-icons/icons/ExternalLinkIcon' /* webpackChunkName: "icons" */),
    },

    data() {
      return {
        polisLogo: require('@/assets/svg/polis-colored-logo.svg'),
        poeLogo: require('@/assets/svg/poe-colored-logo.svg'),
        members: {
          dev: [{ name: 'Moritz Kröger', profile: 'http://moritz.berlin' }],
        },
        teamLabel: {
          polis: {
            label: 'Polis180',
            url: 'https://polis180.org/',
          },
          poe: {
            label: 'Pulse of Europe',
            url: 'https://pulseofeurope.eu',
          },
        },
      }
    },
  }
</script>

<style lang="postcss" scoped>
  h1,
  p {
    margin-bottom: var(--base-gap);
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
    margin-bottom: var(--base-gap);
  }

  .about-people {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;

    .people-group {
      flex: 0 0 50%;
      text-align: center;
    }

    & h2 {
      color: var(--text-color-secondary);
    }

    & ul {
      list-style: none;
    }

    & li:not(:last-child) {
      margin-bottom: var(--small-gap);
    }

    & svg:not(.team-logo) {
      stroke: var(--transparent-white);
      width: 1em;
      height: 1em;
    }
  }

  .people-group.dev h2 {
    margin-bottom: var(--small-gap);
  }

  .group-inner {
    width: calc(100% - var(--base-gap));
    background: var(--background-secondary);
    border-radius: var(--border-radius-medium);
    box-shadow: var(--button-shadow);
    padding: var(--base-gap);
    color: var(--text-color-secondary);
    margin-bottom: var(--base-gap);

    &.dark {
      background: var(--dark-blue);

      & h2,
      & a,
      & span {
        color: var(--text-color-base);
      }
    }

    & a,
    & span {
      color: var(--text-color-secondary);
      font-weight: 700;
    }

    & a:hover {
      color: var(--text-color-special);
    }

    & svg:not(.team-logo) {
      stroke: var(--blue) !important;
    }
  }

  @media (max-width: 630px) {
    .about-people {
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }

    .people-group {
      flex: 0 0 100%;
      width: 100%;
    }

    .group-inner {
      width: 100%;
    }
  }
</style>
