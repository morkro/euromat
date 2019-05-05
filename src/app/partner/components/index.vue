<template>
  <section class="partner-page">
    <h1>{{ $t('partner.headline') }}</h1>

    <v-markdown :source="$t('partner.content')" />

    <ul class="partners-list">
      <li v-for="partner in $t('partner.partners')" :key="partner.name">
        <h2>
          <a
            :href="partner.url"
            target="_blank"
            rel="noopener"
          >
            {{ partner.name }}
          </a>
        </h2>
        <p>{{ partner.description }}</p>
      </li>
    </ul>

    <ul class="communications-list">
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
    </ul>
  </section>
</template>

<script>
  export default {
    name: 'Partner'
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/colors";
  @import "~@/styles/layout";

  .partner-page {
    h1 {
      margin-bottom: $base-gap;
    }
  }

  .partners-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    list-style: none;
    width: 100%;
    margin-top: $base-gap;

    & li {
      width: calc(25% - #{$base-gap});
      flex: 1 0 auto;
      border: 1px solid red;
      margin-bottom: $base-gap;

      &:not(:nth-of-type(4n)) {
        margin-right: $base-gap;
      }
    }
  }
</style>
