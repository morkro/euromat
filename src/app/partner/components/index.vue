<template>
  <section class="partner-page">
    <h1>{{ $t('partner.headline') }}</h1>

    <v-markdown :source="$t('partner.content')" />

    <ul class="partners-list">
      <li v-for="partner in $t('partner.partners')" :key="partner.name">
        <a
          class="partners-list-logo"
          :href="partner.url"
          target="_blank"
          rel="noopener"
        >
          <img
            :src="getPartnerLogo(partner.name)"
            :alt="partner.name"
            :title="partner.name"
          >
        </a>
        <div class="partners-list-content">
          <h2>
            {{ partner.name }}
          </h2>
          <v-markdown v-if="!!partner.description" :source="partner.description" />
        </div>
      </li>
    </ul>

    <!-- <ul class="communications-list">
      <li v-for="communicationPartner in $t('partner.communication')" :key="communicationPartner.name">
        <h2>
          <a
            :href="communicationPartner.url"
            target="_blank"
            rel="noopener"
          >
            {{ communicationPartner.name }}
          </a>
        </h2>
        <p>{{ communicationPartner.description }}</p>
      </li>
    </ul> -->
  </section>
</template>

<script>
  export default {
    name: 'Partner',

    methods: {
      getPartnerLogo (token) {
        const name = token.toLowerCase().replace(/\s/g, '-')
        return require(`@/assets/${name}-logo.png`)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/colors";
  @import "~@/styles/layout";

  $breakpoint: 630px;

  .partner-page {
    h1 {
      margin-bottom: $base-gap;
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
    margin-top: $base-gap;

    li {
      width: calc(50% - #{$base-gap});
      flex: 0 0 auto;
      background: $medium-blue;
      border-radius: $border-radius-medium;
      margin-bottom: $base-gap;

      &:not(:nth-of-type(even)):not(:last-child) {
        margin-right: $base-gap;
      }

      img {
        width: 100%;
      }

      @media (max-width: $breakpoint) {
        margin-right: 0;
        flex: 0 0 100%;
        width: 100%;

        &:not(:nth-of-type(even)):not(:last-child) {
          margin-right: 0;
        }
      }
    }

    h2 {
      color: $text-color-base;
      margin-bottom: calc(#{$base-gap} / 2);
    }

    .partners-list-logo {
      background: $background-secondary;
      border-radius: $border-radius-medium;
      padding: $base-gap;
      margin-bottom: calc(#{$base-gap} / 2);
      display: block;
    }

    .partners-list-content {
      padding: 0 $base-gap $base-gap;
    }
  }
</style>
