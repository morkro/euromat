<template>
  <section>
    <h1>{{ $t('imprint.headline') }}</h1>

    <div class="imprint-basic">
      <div class="imprint-address">
        <div class="imprint-group">
          <h3>{{ $t('imprint.poe.addressLabel') }}</h3>
          <address>
            <v-markdown :source="$t('imprint.poe.address')" />
          </address>
        </div>

        <div class="imprint-group">
          <h3>{{ $t('imprint.poe.representedLabel') }}</h3>
          <p>{{ $t('imprint.poe.represented') }}</p>
        </div>

        <div class="imprint-group inline">
          <h3>{{ $t('imprint.poe.emailLabel') }}</h3>
          <a class="btn btn-dark btn-small" :href="`mailto:${$t('imprint.poe.email')}`">
            {{ $t('imprint.poe.email') }} <feather-mail />
          </a>
        </div>

        <div class="imprint-group inline">
          <h3>{{ $t('imprint.poe.phoneLabel') }}</h3>
          <a class="btn btn-dark btn-small" :href="`tel:${$t('imprint.poe.phone')}`">
            {{ $t('imprint.poe.phone') }} <feather-phone />
          </a>
        </div>

        <div class="imprint-group">
          <h3>{{ $t('imprint.poe.registerLabel') }}</h3>
          <v-markdown :source="$t('imprint.poe.register')" />
        </div>
      </div>

      <div class="imprint-address">
        <div class="imprint-group">
          <h3>{{ $t('imprint.polis180.addressLabel') }}</h3>
          <address>
            <v-markdown :source="$t('imprint.polis180.address')" />
          </address>
        </div>

        <div class="imprint-group">
          <h3>{{ $t('imprint.polis180.representedLabel') }}</h3>
          <p>{{ $t('imprint.polis180.represented') }}</p>
        </div>

        <div class="imprint-group inline">
          <h3>{{ $t('imprint.polis180.emailLabel') }}</h3>
          <a class="btn btn-dark btn-small" :href="`mailto:${$t('imprint.polis180.email')}`">
            {{ $t('imprint.polis180.email') }} <feather-mail />
          </a>
        </div>

        <div class="imprint-group inline">
          <h3>{{ $t('imprint.polis180.phoneLabel') }}</h3>
          <a class="btn btn-dark btn-small" :href="`tel:${$t('imprint.polis180.phone')}`">
            {{ $t('imprint.polis180.phone') }} <feather-phone />
          </a>
        </div>

        <div class="imprint-group">
          <h3>{{ $t('imprint.polis180.registerLabel') }}</h3>
          <v-markdown :source="$t('imprint.polis180.register')" />
        </div>
      </div>
    </div>

    <hr>

    <div class="imprint-responsibility">
      <div class="imprint-group">
        <h3>{{ $t('imprint.responsible.headline') }}</h3>
        <v-markdown :source="$t('imprint.responsible.text')" />
      </div>

      <div class="imprint-group inline">
        <h3>{{ $t('imprint.responsible.mail') }}</h3>
        <a class="btn btn-dark btn-small" href="mailto:hello@euromat.info">
          hello@euromat.info <feather-mail />
        </a>
      </div>
    </div>

    <hr>

    <ul class="imprint-info">
      <li v-for="info of $t('imprint.content')" :key="info.title">
        <h2>{{ info.title }}</h2>
        <p>{{ info.text }}</p>
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    name: 'Imprint',

    components: {
      'feather-mail': () =>
        import('vue-feather-icons/icons/MailIcon' /* webpackChunkName: "icons" */),
      'feather-phone': () =>
        import('vue-feather-icons/icons/PhoneIcon' /* webpackChunkName: "icons" */)
    },

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
  @import "~@/styles/layout";
  @import "~@/styles/colors";

  h1 {
    margin-bottom: $base-gap;
  }

  .imprint-basic,
  .imprint-responsibility {
    margin-bottom: $base-gap / 2;
  }

  hr {
    display: block;
    width: 100%;
    border: none;
    height: 4px;
    background: $transparent-white;
    margin-bottom: $base-gap;
  }

  .imprint-basic {
    display: flex;
    justify-content: space-between;

    @media (max-width: 700px) {
      flex-direction: column;
    }

    address {
      font-style: normal;
    }

    .imprint-address {
      width: calc(50% - #{$base-gap / 2});

      @media (max-width: 700px) {
        width: 100%;

        &:last-of-type {
          border-top: 4px solid $transparent-white;
          padding-top: $small-gap;
        }
      }
    }
  }

  .imprint-group {
    margin-bottom: $small-gap;

    &.inline {
      display: flex;
      align-items: center;
    }

    &.inline h3 {
      margin-right: $small-gap;
    }
  }

  .imprint-info {
    list-style: none;

    h2 {
      margin-bottom: $small-gap / 2;
    }

    li:not(:last-child) {
      margin-bottom: $small-gap;
    }
  }
</style>
