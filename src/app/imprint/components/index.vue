<template>
  <section>
    <h1>{{ $t('imprint.headline') }}</h1>

    <div>
      <h2>{{ $t('imprint.address.label') }}</h2>
      <address>
        <span v-for="txt of $t('imprint.address.poe')">
          <span>{{ txt }}</span><br />
        </span>
      </address>
      <h3>{{ $t('imprint.represented.label') }}</h3>
      <p>{{ $t('imprint.represented.poe') }}</p>
      <h3>{{ $t('imprint.email.label') }}</h3>
      <p>{{ $t('imprint.email.poe') }}</p>
      <h3>{{ $t('imprint.phone.label') }}</h3>
      <p>{{ $t('imprint.phone.poe') }}</p>
    </div>

    <div>
      <h2>{{ $t('imprint.address.label') }}</h2>
      <address>
        <span v-for="txt of $t('imprint.address.polis')">
          <span>{{ txt }}</span><br />
        </span>
      </address>
      <h3>{{ $t('imprint.represented.label') }}</h3>
      <p>{{ $t('imprint.represented.polis') }}</p>
      <h3>{{ $t('imprint.email.label') }}</h3>
      <p>{{ $t('imprint.email.polis') }}</p>
      <h3>{{ $t('imprint.phone.label') }}</h3>
      <p>{{ $t('imprint.phone.polis') }}</p>
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
</style>
