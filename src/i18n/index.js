import Vue from 'vue'
import VueI18n from 'vue-i18n'

import { i18n as intro } from '@/app/intro'

Vue.use(VueI18n)

export default new VueI18n({
  locale: localStorage.getItem('euromat-locale') || 'de',
  fallbackLocale: 'de',
  messages: {
    ...intro
  }
})
