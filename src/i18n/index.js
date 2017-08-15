import Vue from 'vue'
import VueI18n from 'vue-i18n'

import { i18n as intro } from '@/app/intro'
import { i18n as euromat } from '@/app/euromat'
import { i18n as about } from '@/app/about'
import { i18n as fourzerofour } from '@/app/404'
import { i18n as faq } from '@/app/faq'
import { i18n as press } from '@/app/press'
import { i18n as imprint } from '@/app/imprint'
import { i18n as privacy } from '@/app/privacy'

Vue.use(VueI18n)

export default new VueI18n({
  locale: localStorage.getItem('euromat-locale') || 'de',
  fallbackLocale: 'de',
  messages: {
    de: {
      ...intro.de,
      ...euromat.de,
      ...about.de,
      ...fourzerofour.de,
      ...faq.de,
      ...press.de,
      ...imprint.de,
      ...privacy.de
    },
    en: {
      ...intro.en,
      ...euromat.en,
      ...about.en,
      ...fourzerofour.en,
      ...faq.en,
      ...press.en,
      ...imprint.en,
      ...privacy.en
    }
  }
})
