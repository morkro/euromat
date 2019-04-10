import Vue from 'vue'
import VueI18n from 'vue-i18n'

import { i18n as intro } from '@/app/intro'
import { i18n as euromat } from '@/app/euromat'
import { i18n as party } from '@/app/party'
import { i18n as about } from '@/app/about'
import { i18n as fourzerofour } from '@/app/404'
import { i18n as faq } from '@/app/faq'
import { i18n as press } from '@/app/press'
import { i18n as imprint } from '@/app/imprint'
import { i18n as privacy } from '@/app/privacy'
import { i18n as meta } from '@/data'

import { DEFAULT_LOCALE, LOCALES } from '@/config'

Vue.use(VueI18n)

const messages = [
  meta,
  intro, euromat, party,
  about, fourzerofour, faq,
  press, imprint, privacy
]

function getLanguage (locale) {
  return messages.reduce((acc, cur) => ({
    ...acc,
    ...cur[locale]
  }), {})
}

export default new VueI18n({
  locale: localStorage.getItem('euromat-locale') || DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages: LOCALES.reduce((acc, [locale]) => ({
    ...acc,
    [locale]: getLanguage(locale)
  }), {})
})
