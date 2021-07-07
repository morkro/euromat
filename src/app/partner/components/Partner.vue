<template>
  <section class="partner-page">
    <h1>{{ $t('partner.headline') }}</h1>

    <v-markdown :source="$t('partner.content')" />

    <ul class="partners-list">
      <li v-for="partner in $t('partner.partners')" :key="partner.name">
        <a class="partners-list-logo" :href="partner.url" target="_blank" rel="noopener">
          <img :src="getPartnerLogo(partner.name)" :alt="partner.name" :title="partner.name" />
        </a>
        <div class="partners-list-content">
          <h2>
            {{ partner.name }}
          </h2>
          <v-markdown v-if="!!partner.description" :source="partner.description" />
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    name: 'Partner',

    methods: {
      getPartnerLogo(token) {
        let name = token.toLowerCase().replace(/\s/g, '-')
        // Hotfix, should be handled correctly.
        if (name.includes('jef')) {
          name = 'jef'
        }

        return require(`@/assets/${name}-logo.png`)
      },
    },
  }
</script>

<style lang="postcss" scoped>
  .partner-page {
    & h1 {
      margin-bottom: var(--base-gap);
    }
  }

  .partners-list,
  .communications-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    list-style: none;
    width: 100%;
    margin-top: var(--base-gap);

    & li {
      width: calc(50% - var(--base-gap));
      flex: 0 0 auto;
      background: var(--medium-blue);
      border-radius: var(--border-radius-medium);
      margin-bottom: var(--base-gap);

      &:not(:nth-of-type(even)):not(:last-child) {
        margin-right: var(--base-gap);
      }

      & img {
        width: 100%;
      }

      @media (max-width: 630px) {
        margin-right: 0;
        flex: 0 0 100%;
        width: 100%;

        &:not(:nth-of-type(even)):not(:last-child) {
          margin-right: 0;
        }
      }
    }

    & h2 {
      color: var(--text-color-base);
      margin-bottom: calc(var(--base-gap) / 2);
    }

    & .partners-list-logo {
      background: var(--background-secondary);
      border-radius: var(--border-radius-medium);
      padding: var(--base-gap);
      margin-bottom: calc(var(--base-gap) / 2);
      display: block;
    }

    & .partners-list-content {
      padding: 0 var(--base-gap) var(--base-gap);
    }
  }
</style>
