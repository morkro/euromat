<template>
  <nav role="navigation" class="app-menu">
    <ul class="top-menu">
      <li v-for="(item, index) of main" :key="item.label + index">
        <router-link tag="a" :to="item.route">
          {{ item.label }}
        </router-link>
      </li>
    </ul>

    <div :class="['menu-language', { 'show-languages': languageMenuSelected }]">
      <button
        class="btn-txt"
        type="button"
        @click="toggleLanguageSelection"
      >
        <img :src="selectedLanguage.icon"
          :width="buttonSize"
          :height="buttonSize"
          :alt="selectedLanguage.locale"
        >
      </button>

      <div
        class="menu-language-select"
        @click.self="hideLanguageSelection"
      >
        <ul>
          <li
            v-for="lang of languages"
            :key="lang.locale"
            :class="{ selected: $i18n.locale === lang.locale }"
          >
            <button @click="changeLanguage(lang.locale)">
              <img :src="lang.icon"
                :width="buttonSize"
                :height="buttonSize"
                :alt="lang.locale"
              >
              <span>{{ lang.language }}</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  import { setCurrentLocale } from '@/i18n/helper'
  export default {
    name: 'AppMenu',

    props: {
      main: { type: Array, default: () => [{ label: 'Index', route: { path: '/' } }] },
      languages: { type: Array, default: () => [] }
    },

    data () {
      return {
        buttonSize: 20,
        languageMenuSelected: false
      }
    },

    computed: {
      selectedLanguage () {
        return this.languages.find(lang => lang.locale === this.$i18n.locale)
      }
    },

    methods: {
      toggleLanguageSelection () {
        this.languageMenuSelected = !this.languageMenuSelected
      },
      hideLanguageSelection () {
        this.languageMenuSelected = false
      },
      changeLanguage (locale) {
        setCurrentLocale(locale)
        this.hideLanguageSelection()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/animations";
  @import "~@/styles/colors";
  @import "~@/styles/layout";

  $language-btn-size: 45px;

  .app-menu {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    @media (max-width: 480px) {
      flex-direction: column;
    }
  }

  ul {
    list-style: none;
  }

  .top-menu {
    text-align: right;
    width: 100%;
    display: flex;

    @media (max-width: 480px) {
      margin-bottom: $small-gap + 5;

      li:last-child {
        margin-right: 0;
      }
    }

    li {
      margin-right: $base-gap;
    }
  }

  a {
    text-decoration: none;
    font-weight: 600;
    display: block;
  }

  .menu-language {
    display: flex;
    justify-content: space-around;
    position: relative;

    > button {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 5px;
      background: rgba(0, 0, 0, 0.1);
      border-radius: 100%;
      width: $language-btn-size;
      height: $language-btn-size;
      transition: background 150ms $easeOutBack;

      &:hover {
        background: $transparent-black;
      }

      &:focus {
        box-shadow: none;
        border: 2px solid $orange;
        background: $button-background-secondary;
      }
    }

    img {
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

    .show-languages & {
      display: flex;
    }

    ul {
      background: $background-secondary;
      width: 100%;
      border-radius: 10px;
      box-shadow: $button-shadow;

      @media (max-width: 480px) {
        width: 95%;
        margin: 0 auto;
      }
    }

    ul li {
      &:not(:last-child) {
        border-bottom: 2px solid $transparent-black;
      }
    }

    ul button {
      width: 100%;
      background: none;
      box-shadow: none;
      text-shadow: none;
      border-radius: 0;
      color: $text-color-secondary;

      &:hover {
        transform: translateY(0);
        box-shadow: none;
      }

      & span {
        margin-left: 0.5em;
      }

      & img {
        margin: 0;
        height: auto;
        box-shadow: 0 0px 3px rgba(0, 0, 0, 0.2);
        display: inline-flex;
      }
    }
  }
</style>
