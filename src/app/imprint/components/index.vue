<template>
  <section>
    <h1>{{ $t('imprint.headline') }}</h1>

    <div class="imprint-basic">
      <div class="imprint-address">
        <div class="imprint-group">
          <h3>{{ $t('imprint.address.label') }}</h3>
          <address>
            <span v-for="txt of $t('imprint.address.poe')" :key="txt">
              <span>{{ txt }}</span><br>
            </span>
          </address>
        </div>

        <div class="imprint-group">
          <h3>{{ $t('imprint.represented.poe.label') }}</h3>
          <p>{{ $t('imprint.represented.poe.text') }}</p>
        </div>

        <div class="imprint-group inline">
          <h3>{{ $t('imprint.email.label') }}</h3>
          <a class="btn btn-dark btn-small" :href="`mailto:${$t('imprint.email.poe')}`">
            {{ $t('imprint.email.poe') }} <feather-mail />
          </a>
        </div>

        <div class="imprint-group inline">
          <h3>{{ $t('imprint.phone.label') }}</h3>
          <a class="btn btn-dark btn-small" :href="`tel:${$t('imprint.phone.poe')}`">
            {{ $t('imprint.phone.poe') }} <feather-phone />
          </a>
        </div>

        <div class="imprint-group">
          <h3>{{ $t('imprint.register.poe.label') }}</h3>
          <p v-for="txt of $t('imprint.register.poe.text')" :key="txt">
            {{ txt }}
          </p>
        </div>
      </div>

      <div class="imprint-address">
        <div class="imprint-group">
          <h3>{{ $t('imprint.address.label') }}</h3>
          <address>
            <span v-for="txt of $t('imprint.address.polis')" :key="txt">
              <span>{{ txt }}</span><br>
            </span>
          </address>
        </div>

        <div class="imprint-group">
          <h3>{{ $t('imprint.represented.polis.label') }}</h3>
          <p>{{ $t('imprint.represented.polis.text') }}</p>
        </div>

        <div class="imprint-group inline">
          <h3>{{ $t('imprint.email.label') }}</h3>
          <a class="btn btn-dark btn-small" :href="`mailto:${$t('imprint.email.polis')}`">
            {{ $t('imprint.email.polis') }} <feather-mail />
          </a>
        </div>

        <div class="imprint-group inline">
          <h3>{{ $t('imprint.phone.label') }}</h3>
          <a class="btn btn-dark btn-small" :href="`tel:${$t('imprint.phone.polis')}`">
            {{ $t('imprint.phone.polis') }} <feather-phone />
          </a>
        </div>

        <div class="imprint-group">
          <h3>{{ $t('imprint.register.polis.label') }}</h3>
          <p v-for="txt of $t('imprint.register.polis.text')" :key="txt">
            {{ txt }}
          </p>
        </div>
      </div>
    </div>

    <hr>

    <div class="imprint-responsibility">
      <div class="imprint-group">
        <h3>{{ $t('imprint.responsible.label') }}</h3>
        <p v-for="txt of $t('imprint.responsible.text')" :key="txt">
          {{ txt }}
        </p>
      </div>

      <div class="imprint-group inline">
        <h3>{{ $t('imprint.responsible.mail.label') }}</h3>
        <a class="btn btn-dark btn-small" :href="`mailto:${$t('imprint.responsible.mail.mail')}`">
          {{ $t('imprint.responsible.mail.mail') }} <feather-mail />
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
