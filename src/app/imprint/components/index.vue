<template>
  <section>
    <h1>{{ $t('imprint.headline') }}</h1>

    <div class="imprint">
      <div class="imprint-info">
        <h2>{{ $t('imprint.address.label') }}</h2>
        <address>
          <span v-for="txt of $t('imprint.address.poe')">
            <span>{{ txt }}</span><br />
          </span>
        </address>
        <h3>{{ $t('imprint.represented.label') }}</h3>
        <p>{{ $t('imprint.represented.poe') }}</p>
        <h3>{{ $t('imprint.email.label') }}</h3>
        <a class="btn" :href="`mailto:${$t('imprint.email.poe')}`">{{ $t('imprint.email.poe') }}</a>
        <h3>{{ $t('imprint.phone.label') }}</h3>
        <a :href="`tel:${$t('imprint.phone.poe')}`">{{ $t('imprint.phone.poe') }}</a>
      </div>

      <div class="imprint-info">
        <h2>{{ $t('imprint.address.label') }}</h2>
        <address>
          <span v-for="txt of $t('imprint.address.polis')">
            <span>{{ txt }}</span><br />
          </span>
        </address>
        <h3>{{ $t('imprint.represented.label') }}</h3>
        <p>{{ $t('imprint.represented.polis') }}</p>
        <h3>{{ $t('imprint.email.label') }}</h3>
        <a class="btn" :href="`mailto:${$t('imprint.email.polis')}`">{{ $t('imprint.email.polis') }}</a>
        <h3>{{ $t('imprint.phone.label') }}</h3>
        <a :href="`tel:${$t('imprint.phone.polis')}`">{{ $t('imprint.phone.polis') }}</a>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'Imprint',

    data () {
      return {
        social: {
          polis: [
            { platform: 'Twitter', url: '' },
            { platform: 'Facebook', url: '' }
          ],
          poe: [
            { platform: 'Twitter', url: '' },
            { platform: 'Facebook', url: '' }
          ]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/layout";

  h1 {
    margin-bottom: $base-gap;
  }

  .imprint {
    display: flex;
    justify-content: space-between;

    .imprint-info {
      width: calc(50% - #{$base-gap / 2});
    }
  }
</style>
