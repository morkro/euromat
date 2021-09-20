<template>
  <section>
    <h1>{{ $t('about.headline') }}</h1>

    <div class="about-content">
      <div class="about-text">
        <v-markdown :source="$t('about.content')" />
      </div>

      <div class="about-people">
        <div v-for="team of teamLabels" :key="team.label" :class="`people-group ${team.token}`">
          <div class="group-inner">
            <h2>
              <a :href="team.url" target="_blank" rel="noopener noreferrer">
                <img
                  v-if="team.logo"
                  :class="`team-logo ${team.token}`"
                  :src="team.logo"
                  :alt="team.label"
                  height="100"
                />
                <span :hidden="team.logo !== false">{{ team.label }}</span>
              </a>
            </h2>
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
                  rel="noopener noreferrer"
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
        import('vue-feather-icons/icons/ExternalLinkIcon' /* webpackChunkName: "icons" */),
    },

    data() {
      return {
        members: {
          dev: [{ name: 'Moritz Kröger', profile: 'http://moritz.berlin' }],
        },
        teamLabels: [
          {
            token: 'polis',
            label: 'Polis180',
            logo: require('@/assets/svg/polis-colored-logo.svg'),
            url: 'https://polis180.org/',
          },
          {
            token: 'poe',
            label: 'Pulse of Europe',
            logo: require('@/assets/svg/poe-colored-logo.svg'),
            url: 'https://pulseofeurope.eu',
          },
          {
            token: 'jef',
            label: 'JEF Deutschland',
            logo: require('@/assets/jef-logo.png'),
            url: 'https://jef.de',
          },
          {
            token: 'foederalist',
            label: 'Der (europäische) Föderalist',
            logo: false,
            url: 'https://www.foederalist.eu',
          },
        ],
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
    display: grid;
    grid-gap: var(--base-gap);
    grid-template-columns: 1fr 1fr;
    grid-template-rows: min-content;

    & .people-group {
      text-align: center;
    }

    & h2 {
      color: var(--prussian-blue);
    }

    & ul {
      list-style: none;
    }

    & svg:not(.team-logo) {
      stroke: var(--white);
      width: 1em;
      height: 1em;
    }

    & img {
      max-height: 100%;
      width: 100%;
    }
  }

  .people-group.dev {
    grid-column: span 2;

    & h2 {
      margin-bottom: var(--base-gap);
    }
  }

  .group-inner {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--background-secondary);
    border-radius: var(--border-radius);
    padding: var(--base-gap);
    color: var(--prussian-blue);

    &.dark {
      background: var(--prussian-blue);
      flex-direction: column;

      & h2,
      & a,
      & span {
        color: var(--white);
      }
    }

    & a,
    & span {
      color: var(--prussian-blue);
      font-weight: 700;
    }

    & a:hover {
      color: var(--orange);
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
