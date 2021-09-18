<template>
  <nav role="navigation" class="app-menu">
    <div v-if="languageMenuSelected" class="shadow" @click.self="hideLanguageSelection" />

    <ul class="top-menu">
      <li v-for="(item, index) of main" :key="item.label + index">
        <router-link tag="a" :to="item.route">
          <component :is="`feather-${item.icon}`" />
          {{ item.label }}
        </router-link>
      </li>
    </ul>

    <div :class="['menu-language', { 'show-languages': languageMenuSelected }]">
      <v-button text-only @click="toggleLanguageSelection">
        <visually-hidden>{{ $t('meta.topMenu.language') }}</visually-hidden>
        <feather-globe />
      </v-button>

      <div class="menu-language-select" @click.self="hideLanguageSelection">
        <ul>
          <li
            v-for="lang of languages"
            :key="lang.locale"
            :class="{ selected: $i18n.locale === lang.locale }"
          >
            <v-button small @click="changeLanguage(lang.locale)">
              <span>{{ lang.language }}</span>
            </v-button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  import { setCurrentLocale, getTranslatedUrl } from '@/i18n/helper'
  export default {
    name: 'AppMenu',

    components: {
      'feather-globe': () =>
        import('vue-feather-icons/icons/GlobeIcon' /* webpackChunkName: "icons" */),
      'feather-home': () =>
        import('vue-feather-icons/icons/HomeIcon' /* webpackChunkName: "icons" */),
      'feather-help-circle': () =>
        import('vue-feather-icons/icons/HelpCircleIcon' /* webpackChunkName: "icons" */),
      'feather-users': () =>
        import('vue-feather-icons/icons/UsersIcon' /* webpackChunkName: "icons" */),
      'feather-mail': () =>
        import('vue-feather-icons/icons/MailIcon' /* webpackChunkName: "icons" */),
      'feather-smile': () =>
        import('vue-feather-icons/icons/SmileIcon' /* webpackChunkName: "icons" */),
    },

    props: {
      main: { type: Array, default: () => [{ label: 'Index', route: { path: '/' } }] },
      languages: { type: Array, default: () => [] },
    },

    data() {
      return {
        buttonSize: 20,
        languageMenuSelected: false,
      }
    },

    computed: {
      selectedLanguage() {
        return this.languages.find((lang) => lang.locale === this.$i18n.locale)
      },
    },

    methods: {
      toggleLanguageSelection() {
        this.languageMenuSelected = !this.languageMenuSelected
      },
      hideLanguageSelection() {
        this.languageMenuSelected = false
      },
      changeLanguage(locale) {
        const routeName = this.$route.name
        let translatedUrl = null

        setCurrentLocale(locale)

        // @FIXME: This is bit of a hack. Make it smarter.
        if (routeName === 'intro') {
          translatedUrl = '/' + locale
        } else if (getTranslatedUrl(routeName)) {
          if (['emphasis', 'results'].includes(routeName)) {
            translatedUrl = getTranslatedUrl(routeName, getTranslatedUrl('theses', null, true))
          } else {
            translatedUrl = getTranslatedUrl(routeName)
          }
        }

        document.querySelector('.go-to-main').textContent = this.$t('meta.skipToMain')
        document.querySelector('#main').focus()
        this.$router.replace(translatedUrl)
        this.hideLanguageSelection()
      },
      getLocale(locale) {
        return locale === 'en' ? 'GBR' : locale.toUpperCase()
      },
    },
  }
</script>

<style lang="postcss" scoped>
  .app-menu {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    @media (max-width: 480px) {
      flex-direction: column;
    }
  }

  .shadow {
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 0;
    background: var(--prussian-blue);
    opacity: 0.5;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  ul {
    list-style: none;
  }

  .top-menu {
    text-align: right;
    width: 100%;
    display: flex;

    @media (max-width: 480px) {
      margin-bottom: calc(var(--small-gap) + 5px);

      & li:last-child {
        margin-right: 0;
      }

      & a {
        text-align: center;
      }
    }

    & li {
      margin-right: var(--base-gap);

      @media (max-width: 380px) {
        margin-right: calc(var(--base-gap) / 2);
      }
    }
  }

  a {
    text-decoration: none;
    font-weight: 600;
    display: flex;
    align-items: center;

    & svg {
      stroke: var(--blue-green);
      margin-right: calc(var(--small-gap) / 2);
    }
  }

  .menu-language {
    --language-btn-size: var(--base-gap);
    display: flex;
    justify-content: space-around;
    position: relative;

    & > .btn {
      display: flex;
      border: 2px dashed var(--background-primary);

      &:focus {
        border-color: var(--orange);
        outline: none;
        background: var(--blue-green);
      }
    }

    & img {
      margin: 0 auto;
    }
  }

  .menu-language-select {
    display: none;
    position: absolute;
    top: 0;
    right: 0;

    @media (max-width: 480px) {
      position: fixed;
      width: 100vw;
      height: 100vh;
      align-items: center;
      background: rgba(0, 0, 0, 0.55);
    }

    @nest .show-languages & {
      display: flex;
    }

    & ul {
      background: var(--white);
      width: 100%;
      border-radius: var(--border-radius);
      overflow: hidden;
      border: 2px solid var(--prussian-blue);

      @media (max-width: 480px) {
        width: 95%;
        margin: 0 auto;
      }

      & li {
        display: flex;
      }

      & li:not(:last-child) {
        border-bottom: 2px solid var(--prussian-blue);
      }
    }

    & ul button {
      width: 100%;
      border: none;
      border-radius: 0;

      &:hover {
        color: var(--orange);
      }

      & span {
        font-size: var(--font-size-medium);
      }
    }
  }
</style>
